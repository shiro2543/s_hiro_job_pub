<?php
    //パスワードファイル読込
    require_once('../hidden_contents/mysql_login_info.php');

    try {
        //db接続
        $db = new PDO($mysql_dsn, $mysql_user, $mysql_password);
        
        //トランザクション開始
        $db->beginTransaction();
        echo 'transaction started.';

        //db更新処理
        $json = file_get_contents('php://input');
        if($json === false) {
            echo 'file not found.';
            exit();
        }

        $json_data = json_decode($json, false);
        //json_data から日付データを取得    
        $date = $json_data->calender->year . '-' . $json_data->calender->month . '-' . $json_data->calender->date;
        //error_log($date);

        //-------------------------------------//
        //その日($date)の既存レコードがあったら削除
        //-------------------------------------//
        //1. select で既存データを読み出す
        //2. delete で削除する
        $stmt_removeInfo = $db->prepare('delete from info_pieces where date="' . $date . '"');
        $stmt_removeInfo->execute();
        $stmt_removeSleepTime = $db->prepare('delete from sleep_times where date="' . $date . '"');
        $stmt_removeSleepTime->execute();
        $stmt_removeFeeling = $db->prepare('delete from feelings where date="' . $date . '"');
        $stmt_removeFeeling->execute();
        $stmt_removeMealPoint = $db->prepare('delete from meal_points where date="' . $date . '"');
        $stmt_removeMealPoint->execute();
        $stmt_removeMealDetail = $db->prepare('delete from meal_details where date="' . $date . '"');
        $stmt_removeMealDetail->execute();
        $stmt_removeMedicine = $db->prepare('delete from medicine_checkes where date="' . $date . '"');
        $stmt_removeMedicine->execute();
        $stmt_removeComment = $db->prepare('delete from comments where date="' . $date . '"');
        $stmt_removeComment->execute();

        //---------------------------------------------//
        //以下、jsonの各データをparseしてdbにレコードを保存
        //---------------------------------------------//
        //infoPieceをパース、db更新
        
        foreach($json_data->infoPiece as $info) {
            //$info->title のようにレコードをdbレコードにパース
            $title = $info->title;
            $start_time = null;
            if($info->time->start->ampm === 'pm') {
                $start_time = ($info->time->start->hour + 12) . ':' . $info->time->start->minute . ':00';
            } else {
                $start_time = $info->time->start->hour . ':' . $info->time->start->minute . ':00';
            }
            $end_time = null;
            if($info->time->end->ampm === 'pm') {
                $end_time = ($info->time->end->hour + 12) . ':' . $info->time->end->minute . ':00';
            } else {
                $end_time = $info->time->end->hour . ':' . $info->time->end->minute . ':00';
            }
            $tag = $info->tag;
            $comment = $info->comment;

            $temp_sql = 'insert into life_rhythm_record.info_pieces(date, title, start_time, end_time, tag, comment) values("' . $date . '", "' . $title . '", "' . $start_time . '", "' . $end_time . '", "' . $tag . '", "' . $comment . '")';
            error_log($temp_sql);
            $db->exec($temp_sql);
        }
        

        //睡眠時間
        $db->exec('insert into life_rhythm_record.sleep_times(date, sleep_time_length) values("' . $date . '", "' . $json_data->rightMenu->sleepTime . '")');

        //気分
        $db->exec('insert into life_rhythm_record.feelings(date, ampm, feeling) values("' . $date . '", "am", "' . $json_data->rightMenu->feelingAM . '")');
        $db->exec('insert into life_rhythm_record.feelings(date, ampm, feeling) values("' . $date . '", "pm", "' . $json_data->rightMenu->feelingPM . '")');

        //食事
        $meal_timing_array = ['breakfast', 'lunch', 'dinner'];
        foreach($meal_timing_array as $meal_timing) {
            foreach($json_data->rightMenu->$meal_timing->point as $meal_type => $meal_point) {
                $db->exec('insert into life_rhythm_record.meal_points(date, timing, meal_type, point) values("' . $date . '", "' . $meal_timing . '", "' . $meal_type . '", "' . $meal_point . '")');
            }
            $db->exec('insert into life_rhythm_record.meal_details(date, timing, detail) values("' . $date . '", "' . $meal_timing . '", "' . $json_data->rightMenu->$meal_timing->detail . '")');
        }

        //服薬
        $okng_value = null;
        console.log('$json_data->rightMenu->medicine->value: ' . $json_data->rightMenu->medicine->value);
        if(strcmp($json_data->rightMenu->medicine->value, "OK") === 0) {
            $okng_value = 1;
            $db->exec('insert into life_rhythm_record.medicine_checkes(date, okng, comment) values("' . $date . '", ' . $okng_value . ', "' . $json_data->rightMenu->medicine->comment . '")');
        } else if(strcmp($json_data->rightMenu->medicine->value, "忘れ") === 0) {
            $okng_value = 0;
            $db->exec('insert into life_rhythm_record.medicine_checkes(date, okng, comment) values("' . $date . '", ' . $okng_value . ', "' . $json_data->rightMenu->medicine->comment . '")');
        } else {
            $db->exec('insert into life_rhythm_record.medicine_checkes(date, comment) values("' . $date . '", "' . $json_data->rightMenu->medicine->comment . '")');
        }
        
        //コメント
        $db->exec('insert into life_rhythm_record.comments(date, comment) values("' . $date . '", "' . $json_data->rightMenu->comment . '")');
        //コミット
        $db->commit();
        echo 'transaction commited.';
    } catch(PDOException $e) {
        //ロールバック
        $db->rollBack();

        //エラーメッセージ出力
        echo $e->getMessage();
        exit();
    }

    $db = null;

?>
