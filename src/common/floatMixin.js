//混入对象 
 const mixin = {
    created() {
        this.flag = false;
        this.cur = {
            x: 0,
            y: 0
        };
        this.diffX = 0;
        this.diffY = 0;
        this.disX = 0;
        this.disY = 0;
        this.clientH = document.body.clientHeight || document.documentElement.clientHeight;
        this.clientW = document.body.clientWidth || document.documentElement.clientWidth;

    },
    methods: {
        down($event) {
            let targetElement = $event.target || $event.srcElement
            if (targetElement.nodeName.toLowerCase() === 'span') {
                targetElement = targetElement.parentNode
            }
            this.flag = true;
            let touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            this.cur.x = touch.clientX;
            this.cur.y = touch.clientY;
            //this.disX = $event.target.offsetLeft;
            //this.disY = $event.target.offsetTop;
            this.disX = targetElement.offsetLeft;
            this.disY = targetElement.offsetTop;
        },
        move($event) {
            if (this.flag) {
                let targetElement = $event.target || $event.srcElement
                if (targetElement.nodeName.toLowerCase() === 'span') {
                    targetElement = targetElement.parentNode
                }
                let touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                this.diffX = touch.clientX - this.cur.x;
                this.diffY = touch.clientY - this.cur.y;
                const pointD = Math.round(this.clientW * 100 / 750);//移动目标直径
                let posX = this.disX + this.diffX;
                let posY = this.disY + this.diffY;
                let x = 0, y = 0;
                if (this.diffX >= 0) {//向右
                    x = posX < this.clientW - pointD ? posX : this.clientW - pointD;
                } else {
                    x = posX > 0 ? posX : 0;
                }
                if (this.diffY >= 0) {//向下
                    y = posY < this.clientH - 46 - pointD ? posY : this.clientH - 46 - pointD;
                } else {
                    y = posY > 0 ? posY : 0;
                }
                //$event.target.style.left = x + "px";
                // $event.target.style.top = y + "px";
                targetElement.style.left = x + "px";
                targetElement.style.top = y + "px";
            }
        },
        end() {
            this.flag = false;
        }
    }
}

export default mixin