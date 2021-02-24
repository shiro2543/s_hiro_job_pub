//作成したframepieceが時間的に重複していないかのチェックを管理する
function DuplicationManager(blockQuantity) {
    //aframe.aframe.wcdrmfp.data.windowList[]を利用して使用済みblockリストを作成、保存しておく
    //新しいframeの保存時にcheck関数を呼び出して、blockリストと照合、保存可/不可を判定
    //不可なら保存させないようにしておく
    var mgr = {
        data: {
            blockUsableList: [],   //indexで管理
            block_quantity: blockQuantity,
        },
        useBlock: function (top_index, bottom_index) {
            if (this.checkBlockUsableList(top_index, bottom_index)) {
                for (var index = top_index; index <= bottom_index; index++) {
                    mgr.data.blockUsableList[index] = false;
                }
                return true;
            } else {
                return false;
            }
        },
        releaseBlock: function (top_index, bottom_index) {
            for (var index = top_index; index <= bottom_index; index++) {
                mgr.data.blockUsableList[index] = true;
            }
        },
        moveBlock: function (org_index_top, org_index_bottom, new_index_top, new_index_bottom) {
            this.releaseBlock(org_index_top, org_index_bottom);
            if (this.useBlock(new_index_top, new_index_bottom)) {
                return true;
            } else {
                this.useBlock(org_index_top, org_index_bottom);
                return false;
            }
        },
        checkBlockUsableList: function (top_index, bottom_index) {
            var result = true;
            for (var index = top_index; index <= bottom_index; index++) {
                if (!(mgr.data.blockUsableList[index])) {
                    result = false;
                    break;
                }
            }
            return result;
        }
    }
    //初期化(全てのブロックを使える状態(true)にする)
    for (var i = 0; i < mgr.data.block_quantity; i++) {
        mgr.data.blockUsableList.push(true);
    }
    return mgr;
}
