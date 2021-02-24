<?php
    //パスワードファイル読込
    require_once('../hidden_contents/mysql_login_info.php');

    //要求されている日付を取得
    $get_json = file_get_contents('php://input');
    $calender_json = json_decode($get_json,false);
    /*
    $calender_json = (object)[
        'year' => 2021,
        'month' => 1,
        'date' => 31
    ];
    */
    $date = $calender_json->year . '-' . $calender_json->month . '-' . $calender_json->date;

    //ダウンロードするjsonを準備
    class InfoPiece {
        public $title;
        public $time;
        public $tag;
        public $comment;
        function __construct($title, $time_start_ampm, $time_start_hour, $time_start_minute, $time_end_ampm, $time_end_hour, $time_end_minute, $tag, $comment) {
            $time_json_format = '{
                "start": {
                    "ampm": null,
                    "hour": null,
                    "minute": null
                },
                "end": {
                    "ampm": null,
                    "hour": null,
                    "minute": null
                }
            }';
            $this->time = json_decode($time_json_format, false);
            $this->title = $title;
            $this->time->start->ampm = $time_start_ampm;
            $this->time->start->hour = $time_start_hour;
            $this->time->start->minute = $time_start_minute;
            $this->time->end->ampm = $time_end_ampm;
            $this->time->end->hour = $time_end_hour;
            $this->time->end->minute = $time_end_minute;
            $this->tag = $tag;
            $this->comment = $comment;
        }
        function encodeJSON() {
            echo json_encode($this, JSON_UNESCAPED_UNICODE);
        }
    }

    class Meal {
        public $point;
        public $detail;
        function __construct() {
            $point_json_format = '{
                "mainDish": null,
                "subDish": null,
                "stapleFood": null,
                "milk": null,
                "fruits": null
            }';
            $this->point = json_decode($point_json_format, false);
            $this->point->mainDish = null;
            $this->point->subDish = null;
            $this->point->stapleFood = null;
            $this->point->milk = null;
            $this->point->fruits = null;
            $this->detail = null;
        }
        function encodeJSON() {
            echo json_encode($this, JSON_UNESCAPED_UNICODE);
        }
    }

    class RightMenu {
        public $sleepTime;
        public $feelingAM;
        public $feelingPM;
        public $breakfast;
        public $lunch;
        public $dinner;
        public $medicine;
        public $comment;

        //breakfast, lunch, dinner はMeal class
        function __construct() {
            $this->sleepTime = null;
            $this->feelingAM = null;
            $this->feelingPM = null;
            $this->breakfast = new Meal();
            $this->lunch = new Meal();
            $this->dinner = new Meal();
            $medicine_json_format = '{
                "value": null,
                "comment": null
            }';
            $this->medicine = json_decode($medicine_json_format, false);
            $this->comment = null;
        }
        function encodeJSON() {
            echo json_encode($this, JSON_UNESCAPED_UNICODE);
        }
    }

    //dbに接続する
    try {
        //db接続
        $db = new PDO($mysql_dsn, $mysql_user, $mysql_password);
        //select要求
        //トランザクション開始
        $db->beginTransaction();
        //echo 'transaction started.==><br>';

        //日付取得
        $select_date = 'year(date) as year, month(date) as month, day(date) as date';
        $select_start_time = 'time_format(start_time, \'%p\') as start_ampm, hour(start_time) as start_hour, minute(start_time) as start_minute';
        $select_end_time = 'time_format(end_time, \'%p\') as end_ampm, hour(end_time) as end_hour, minute(end_time) as end_minute';

        //infoPieces
        $stmt_getInfo = $db->prepare('select id,' . $select_date . ', title, ' . $select_start_time . ', ' . $select_end_time . ', tag, comment from life_rhythm_record.info_pieces where date="' . $date . '"');
        $stmt_getInfo->execute();
        $infoPieceArray = [];   //infoPieces object array
        $ampm_relation_table = [
            'AM' => 'am',
            'PM' => 'pm'
        ];
        if($stmt_getInfo !== false) {
            foreach($stmt_getInfo as $info){
                $start_time_ampm = $ampm_relation_table[$info['start_ampm']];
                $start_time_hour = (int)$info['start_hour'];
                if(strcmp($start_time_ampm,'pm') === 0) {
                    $start_time_hour -= 12;
                }

                if(strcmp($info['end_ampm'], 'AM') === 0 && strcmp($info['end_hour'], '24') === 0) {
                    $end_time_ampm = "pm";
                } else {
                    $end_time_ampm = $ampm_relation_table[$info['end_ampm']];
                }
                $end_time_hour = (int)$info['end_hour'];
                if(strcmp($end_time_ampm, 'pm') === 0) {
                    $end_time_hour -= 12;
                }
                $infoPieceObj = new InfoPiece($info['title'], $start_time_ampm, $start_time_hour, (int)$info['start_minute'], $end_time_ampm, $end_time_hour, (int)$info['end_minute'], $info['tag'], $info['comment']);
                array_push($infoPieceArray, $infoPieceObj);
            }
        }
        //print('infoPieces: ' . json_encode($infoPieceArray, JSON_UNESCAPED_UNICODE) . '<br>');
        
        //rightMenu
        $rightMenu = new RightMenu();

        //睡眠時間
        $stmt_getSleepTime = $db->prepare('select id, ' . $select_date . ', sleep_time_length from life_rhythm_record.sleep_times where date="' . $date . '"');
        $stmt_getSleepTime->execute();
        $result_getSleepTime = $stmt_getSleepTime->fetch();
        if($result_getSleepTime !== false) {
            $rightMenu->sleepTime = (int)$result_getSleepTime['sleep_time_length'];
        }
        //print('sleep_time: ' . $rightMenu->sleepTime . '<br>');

        //気分(AM)
        $stmt_getFeelingAM = $db->prepare('select id, ' . $select_date . ', feeling from life_rhythm_record.feelings where date="' . $date . '" and ampm="am"');
        $stmt_getFeelingAM->execute();
        $result_feelingAM = $stmt_getFeelingAM->fetch();
        if($result_feelingAM !== false) {
            $rightMenu->feelingAM = $result_feelingAM['feeling'];
        }

        //気分(PM)
        $stmt_getFeelingPM = $db->prepare('select id, ' . $select_date . ', feeling from life_rhythm_record.feelings where date="' . $date . '" and ampm="pm"');
        $stmt_getFeelingPM->execute();
        $result_feelingPM = $stmt_getFeelingPM->fetch();
        if($result_feelingPM !== false) {
            $rightMenu->feelingPM = $result_feelingPM['feeling'];
        }

        //食事
        $meal_type_list = ['mainDish', 'subDish', 'stapleFood', 'milk', 'fruits'];
        $meal_timing_list = ['breakfast', 'lunch', 'dinner'];
        $stmt_getMealPoint = $db->prepare('select id, ' . $select_date . ', timing, meal_type, point from life_rhythm_record.meal_points where date ="' . $date . '" and timing = :meal_timing and meal_type = :meal_type');
        $stmt_getMealDetail = $db->prepare('select id, ' . $select_date . ', timing, detail from life_rhythm_record.meal_details where timing = :meal_timing');
        foreach($meal_timing_list as $temp_meal_timing) {
            foreach($meal_type_list as $temp_meal_type) {
                $stmt_getMealPoint->bindValue(':meal_timing', $temp_meal_timing);
                $stmt_getMealPoint->bindValue(':meal_type', $temp_meal_type);
                $stmt_getMealPoint->execute();
                $result_getMealPoint = $stmt_getMealPoint->fetch();
                if($result_getMealPoint !== false) {
                    $rightMenu->$temp_meal_timing->point->$temp_meal_type = (int)$result_getMealPoint['point'];
                }
            }
            $stmt_getMealDetail->bindValue(':meal_timing', $temp_meal_timing);
            $stmt_getMealDetail->execute();
            $result_getMealDetail = $stmt_getMealDetail->fetch();
            if($result_getMealDetail !== false) {
                $rightMenu->$temp_meal_timing->detail = $result_getMealDetail['detail'];
            }
        }
        
        //服薬
        $okng_relation_table = [
            '1' => "OK",
            '0' => "忘れ"
        ];
        $stmt_getMedicine = $db->prepare('select id, ' . $select_date . ', okng, comment from medicine_checkes where date = "' . $date . '"');
        $stmt_getMedicine->execute();
        $result_medicine = $stmt_getMedicine->fetch();
        if($result_medicine !== false) {
            error_log('is_null($result_medicine[\'okng\'])' . is_null($result_medicine['okng']));
            error_log('$result_medicine[\'okng\']: ' . $result_medicine['okng']);
            if(!(is_null($result_medicine['okng']))) {
                $rightMenu->medicine->value = $okng_relation_table[$result_medicine['okng']];
            }
            $rightMenu->medicine->comment = $result_medicine['comment'];
        }

        //コメント
        $stmt_getComment = $db->prepare('select id, ' . $select_date . ', comment from comments where date = "' . $date .'"');
        $stmt_getComment->execute();
        $result_comment = $stmt_getComment->fetch();
        if($result_comment !== false) {
            $rightMenu->comment = $result_comment['comment'];
        }

        //print('rightMenu: ' . $rightMenu->encodeJSON() . '<br>');

        //レスポンス用全体json
        $result_json = (object)[
            'calender' => $calender_json,
            'infoPiece' => $infoPieceArray,
            'rightMenu' => $rightMenu
        ];

        $result_json_text = json_encode($result_json, JSON_UNESCAPED_UNICODE);
        print($result_json_text);

        $db->commit();
        //echo '<br>==>transaction commited.';
    } catch(PDOException $e) {
        //ロールバック
        $db->rollBack();

        //エラーメッセージ出力
        echo $e->getMessage();
        exit();
    }

?>