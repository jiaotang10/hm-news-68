<template>
    <div>
        <newsDigui v-if="aa.parent" :aa='aa.parent'></newsDigui>
        <div class="digui">
            <div class="info">
                <p>1.</p>
                <p class="name">{{aa.user.nickname}}</p>
                <p class="time">{{aa.create_date | now}}</p>
                <p class="reply">回复</p>
            </div>
            <div class="content">{{aa.content}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    aa: Object
  }
}
</script>

<style lang='less' scoped>
.digui{
    margin-top: -1px;
    border: 1px solid #000;
    padding: 15px;
    .info {
        display: flex;
        margin-bottom: 5px;
        p {
            font-size: 16px;
        }
        .name {
            font-size: 16px;
            margin: 0 15px 0 8px;
        }
        .time {
            flex: 1;
            font-size: 14px;
            color: #666;
        }
        .reply {
            margin-right: 5px;
            font-size: 14px;
            color: #666;
        }
    }
    .content {
        font-size: 16px;
    }
}
</style>
