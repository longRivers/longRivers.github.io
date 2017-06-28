require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Blue":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'a8ed7aZRg1FaquyQLDVP/H/', 'Blue');
// Script\wujin\Blue.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        parentNode: cc.Node,
        coins: 300
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.goldLess = cc.find("Canvas/goldLess");
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (B.game.canBuy(self.coins)) {
                //消耗金币
                B.game.downCoin(self.coins);
                self.parentNode.opacity = 100;
                self.parentNode.getComponent(cc.PolygonCollider).tag = 1000;
                self.parentNode.getComponent('invisible').visibleState = 1;

                self.parentNode.getComponent('invisible').scheduleOnce(function () {
                    self.parentNode.opacity = 255;
                    self.parentNode.getComponent(cc.PolygonCollider).tag = 222;
                    self.parentNode.getComponent('invisible').visibleState = 0;
                }, 3);
            } else {
                self.goldLess.opacity = 255;
                var action = cc.fadeTo(1, 0);
                self.goldLess.runAction(action);
            }
            self.parentNode.getComponent('invisible').blueState = 0;
            self.node.active = false;
        });
    }

});

cc._RF.pop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RF.push(module, '991b1gyuapKy5i1kcPk4b7T', 'Game');
// Script\wujin\Game.js

"use strict";

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EnemyManager = require("enemyManager");
var BulletManager = require("bulletManager");
cc.Class({
    extends: cc.Component,

    properties: (_properties = {
        enemyManager: EnemyManager,
        bulletManager: BulletManager,
        gameOverMenu: cc.Node,
        setMenu: cc.Node,
        zantingTip: cc.Node,
        scoreLab: cc.Label,
        coinsLab: cc.Label,
        timeLab: cc.Label,
        bloodLab: cc.Label,
        boshuLab: cc.Label,
        reStartBtn: cc.Button,
        backBtn: cc.Button,
        ygzzjj: cc.Node,
        ydbygzzjj: cc.Node,
        grandFather: cc.Node,
        enemyLayer: cc.Node,
        daojishiLab: cc.Label,
        unlockBuffTip: cc.Node,
        audioEngine: {
            url: cc.AudioClip,
            default: null
        },
        audioEngine1: {
            url: cc.AudioClip,
            default: null
        },
        audioEngine2: {
            url: cc.AudioClip,
            default: null
        },
        audioEngine3: {
            url: cc.AudioClip,
            default: null
        },
        audioEngine4: {
            url: cc.AudioClip,
            default: null
        },
        bulletSource0: {
            type: cc.AudioSource,
            default: null
        }
    }, _defineProperty(_properties, "bulletSource0", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "bulletSource1", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "bulletSource2", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "bulletSource3", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "bulletSource4", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "bulletSource5", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "bulletSource6", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "enemySource", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "unlockSource", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "deadSource", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "hurtSource", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "putSource", {
        type: cc.AudioSource,
        default: null
    }), _defineProperty(_properties, "clickSource", {
        type: cc.AudioSource,
        default: null
    }), _properties),

    // use this for initialization
    onLoad: function onLoad() {
        this.audioID = cc.audioEngine.play(this.audioEngine4, true, 1);
        this.shezhiBtn = 0;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    cc.director.loadScene('main');
                }
            }
        }, this.node);
        B.game = this;
        this.road_path = [cc.p(125, 0), cc.p(125, 110), cc.p(355, 110), cc.p(355, 240), cc.p(125, 240), cc.p(125, 375), cc.p(275, 375), cc.p(275, 440), cc.p(680, 440), cc.p(680, 375), cc.p(840, 375), cc.p(840, 240), cc.p(605, 240), cc.p(605, 110), cc.p(960, 110)];
        //倒计时
        this.daojishi = 3;
        this.daojishiLab.string = this.daojishi;
        // this.startFlag = 0;
        this.schedule(function () {
            this.daojishi--;
            if (this.daojishi == 0) {
                this.daojishiLab.string = "开始游戏!";
                // this.startFlag = 1;
            } else {
                this.daojishiLab.string = this.daojishi;
            }
            if (this.daojishi == -1) {
                this.daojishiLab.node.active = false;
                // cc.game.resume();
                this.startGame();
            }
        }, 1, 3, 0);
    },

    //开始游戏
    startGame: function startGame() {
        //初始化
        this.score = 0;
        this.scoreLab.string = this.score;
        this.coin = 600;
        this.coinsLab.string = this.coin;
        this.towerCoin = 150;
        this.fatherBlood = 10;
        this.bloodLab.string = this.fatherBlood;
        this.time = 30;
        this.timeLab.string = this.time + " s";
        this.boshu = 1;
        this.perDaBo = 5;
        this.boshuLab.string = this.boshu;

        //每杀死一个敌人获得金币数
        this.getCoin = 60;
        //开启音效
        this.musicFlag = 1;
        //解锁第一个buff的分数
        this.lockScore = 500;
        //解锁的buff个数
        this.buffNum = 1;
        //每波敌人个数
        this.perAttackNum = 4;
        //每个敌人的血量
        this.enemyBlood = 6;
        //每个敌人的初始速度
        this.enemySpeed = 100;
        //Buff持续时间
        this.buffTime = 10;
        //怪物类型
        this.enemyType = 1;
        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
        this.enemyManager.init(this);
        this.bulletManager.init(this);
        this.cannons = this.enemyManager.enemyLayer.getChildren();

        //检测是否产生下一波:1.地图上无怪物 2.到达消灭当前怪物的时间限制
        this.schedule(function () {
            if (this.enemyManager.enemyPool.size() == 15 && this.enemyManager.enemyPool2.size() == 15) {
                this.time = 30;
                this.nextAttack();
            }
        }, 5);
        this.schedule(function () {
            if (this.time == 0) {
                this.time = 30;
                this.nextAttack();
            }
            this.time--;
            this.timeLab.string = this.time + "s";
        }, 1);
    },

    //停止游戏
    stopGame: function stopGame() {
        this.clickSource.play();
        cc.audioEngine.play(this.audioEngine3, false, 1);
        this.gameOverMenu.active = true;
        cc.director.getCollisionManager().enabled = false;
    },

    //退出游戏
    onBtnExit: function onBtnExit() {
        this.clickSource.play();
        cc.game.end();
    },

    //设置
    onBtnSet: function onBtnSet() {
        this.clickSource.play();
        if (this.shezhiBtn == 0) {
            this.setMenu.active = true;
            this.shezhiBtn = 1;
        } else {
            this.setMenu.active = false;
            this.shezhiBtn = 0;
        }
    },

    //背景音乐
    onBtnOffMusic: function onBtnOffMusic() {
        if (this.musicFlag == 1) {
            this.musicFlag = 0;
            cc.audioEngine.pauseAll();
        } else {
            this.musicFlag = 1;
            cc.audioEngine.resumeAll();
        }
        this.setMenu.active = false;
    },

    //回到主界面
    backMain: function backMain() {
        this.clickSource.play();
        cc.game.resume();
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("main");
    },

    //重新开始
    reStart: function reStart() {
        this.clickSource.play();
        cc.game.resume();
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("wujin");
    },

    //暂停游戏
    onBtnPauseGame: function onBtnPauseGame() {
        this.clickSource.play();
        this.zantingTip.active = true;
        cc.game.pause();
        this.setMenu.active = false;
    },

    //继续游戏
    onBtnGoon: function onBtnGoon() {
        this.clickSource.play();
        this.zantingTip.active = false;
        cc.game.resume();
        this.setMenu.active = false;
    },

    //获得金币
    gainCoin: function gainCoin() {
        this.coin += this.getCoin;
        this.coinsLab.string = this.coin;
    },

    //获得分数
    gainScore: function gainScore() {
        this.score += this.getCoin;
        this.scoreLab.string = this.score;
        if (this.score > this.lockScore) {
            this.unlockBuff();
            this.lockScore = this.lockScore * 2;
        }
    },

    //检测金币够不够花
    canBuy: function canBuy(coins) {
        if (this.coin - coins >= 0) {
            return 1;
        } else {
            return 0;
        }
    },

    //解锁buff，增加每波敌人数
    unlockBuff: function unlockBuff() {
        this.unlockSource.play();
        if (this.buffNum < 6) {
            this.unlockBuffTip.active = true;
            this.scheduleOnce(function () {
                this.unlockBuffTip.active = false;
            }, 1);
            //cc.audioEngine.play(this.audioEngine, false, 1);
            this.buffNum++;
        }
        if (this.perAttackNum < 9) {
            this.perAttackNum++;
        }
    },

    //花费金币
    downCoin: function downCoin(coins) {
        this.coin -= coins;
        this.coinsLab.string = this.coin;
    },

    //减少爷爷的血
    downFatherBlood: function downFatherBlood() {
        this.fatherBlood--;
        //cc.audioEngine.play(this.audioEngine2, false, 1);
        this.hurtSource.play();
        if (this.fatherBlood == 0) {
            this.grandFather.color = cc.Color.GRAY;
            //cc.audioEngine.play(this.audioEngine1, false, 1);
            this.deadSource.play();
            this.stopGame();
        }
        this.bloodLab.string = this.fatherBlood;
    },

    //产生下一波怪物
    nextAttack: function nextAttack() {
        this.boshu++;
        this.boshuLab.string = this.boshu;
        //每波切换怪物种类
        this.enemyType = 3 - this.enemyType;
        var tempAttackNum = this.perAttackNum;
        if (this.getCoin <= 110) {
            this.getCoin += 5;
        }
        if (this.enemyBlood <= 27) {
            this.enemyBlood += 3;
        }
        if (this.enemySpeed <= 200) {
            this.enemySpeed += 5;
        }
        if (this.boshu % this.perDaBo == 0) {
            //临时将怪物数量增加为1.5倍
            this.perAttackNum = this.perAttackNum + this.perAttackNum / 2;
            this.ydbygzzjj.active = true;
            this.scheduleOnce(function () {
                this.ydbygzzjj.active = false;
            }, 1);
        } else {
            this.ygzzjj.active = true;
            this.scheduleOnce(function () {
                this.ygzzjj.active = false;
            }, 1);
        }
        // console.log("enemyNum: "+this.perAttackNum);
        this.schedule(function () {
            this.enemyManager.createEnemy(this.enemyType);
        }, 1, this.perAttackNum, 0);
        this.perAttackNum = tempAttackNum;
    }

});

cc._RF.pop();
},{"bulletManager":"bulletManager","enemyManager":"enemyManager"}],"ability":[function(require,module,exports){
"use strict";
cc._RF.push(module, '9dbc6VfQqlGDKsxN02KaMN7', 'ability');
// Script\wujin\ability.js

"use strict";

var State = cc.Enum({
    NONE: 0,
    RED: 1,
    ORANGE: 2,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
    PURPLE: 7
});

cc.Class({
    extends: cc.Component,

    properties: {
        coins: 100,
        towerLayer: cc.Node,
        parentPos: cc.Vec2,
        abilityLayer: cc.Node,
        state: {
            type: State,
            default: State.NONE,
            visible: false
        },
        btnNode: cc.Node,
        eventState: 0,
        abilitySource: {
            type: cc.AudioSource,
            default: null
        }

    },

    canBuyAbility: function canBuyAbility() {
        if (B.game.canBuy(this.coins)) {
            this.getBuff();
        } else {
            this.goldLess = cc.find("Canvas/goldLess");
            this.goldLess.opacity = 255;
            var action = cc.fadeTo(1, 0);
            this.goldLess.runAction(action);
            return 0;
        }
    },

    // use this for initialization
    getBuff: function getBuff() {
        var self = this;
        this.preWeaponBtn = this.btnNode;
        if (self.eventState == 0) {
            self.eventState = 1;
            //给能力子节点添加事件监听
            self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
                //cc.audioEngine.play(self.audioSource, false, 1);
                self.abilitySource.play();
                B.game.downCoin(self.coins);
                //选择能力后五秒恢复按钮的状态
                self.btnNode.getComponent("weapon").btnState = 4;
                var preWeaponBtn = self.node.getComponent('ability').preWeaponBtn;
                preWeaponBtn.getComponent("weapon").scheduleOnce(function () {
                    preWeaponBtn.getComponent("weapon").btnState = 2;
                }, B.game.buffTime);
                //获得所有的炮塔子节点
                var tower_children = self.towerLayer.getChildren();
                for (var i = 0; i < tower_children.length; ++i) {
                    var child_pos = tower_children[i].getPosition();
                    var btn_pos = self.parentPos;

                    if (child_pos.x == btn_pos.x && child_pos.y == btn_pos.y) {

                        tower_children[i].color = this.color;
                        tower_children[i].getComponent("tower").state = self.state;
                        // console.log("ability40 "+self.state);
                        tower_children[i].getComponent("tower").scheduleOnce(function () {
                            tower_children[i].color = cc.color(255, 255, 255);
                            tower_children[i].getComponent("tower").state = State.NONE;
                        }, B.game.buffTime);

                        var a_children = self.abilityLayer.getChildren();

                        for (var j = 0; j < a_children.length; ++j) {
                            a_children[j].active = false;
                        }
                        break;
                    }
                }
            });
        }
    }

});

cc._RF.pop();
},{}],"begin":[function(require,module,exports){
"use strict";
cc._RF.push(module, '2a2b4Kkz4xFtb3X1y2Sm8Sf', 'begin');
// Script\begin.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        storyBoard: cc.Node,
        btnPlay: cc.Node,
        btnStory: cc.Node,
        audioSource: {
            url: cc.AudioClip,
            default: null
        },
        audioSource1: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.audioID = cc.audioEngine.play(this.audioSource, true, 1);
    },

    onBtnStory: function onBtnStory() {
        // cc.audioEngine.pauseAll();
        this.storyBoard.active = true;
        this.btnPlay.active = false;
        this.btnStory.active = false;
    },

    onBtnPlay: function onBtnPlay() {
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("load");
    },

    onBtnBack: function onBtnBack() {
        cc.audioEngine.play(this.audioSource1, false, 1); //返回按钮音效
        this.storyBoard.active = false;
        this.btnPlay.active = true;
        this.btnStory.active = true;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{}],"bulletManager":[function(require,module,exports){
"use strict";
cc._RF.push(module, '9ee56V/0aJOALo+EaHkM63q', 'bulletManager');
// Script\wujin\bulletManager.js

"use strict";

var bulletManager = cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        bulletLayer: cc.Node
    },

    init: function init(game) {
        this.game = game;
        B.bulletManager = this;
        this.bulletPool = new cc.NodePool();
        var initCount = 50;
        for (var i = 0; i < initCount; ++i) {
            var bullet = cc.instantiate(this.bulletPrefab); // 创建节点
            this.bulletPool.put(bullet); // 通过 putInPool 接口放入对象池
        }
    },

    createBullet: function createBullet() {
        var bullet = null;
        if (this.bulletPool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            bullet = this.bulletPool.get();
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            bullet = cc.instantiate(this.bulletPrefab);
        }
        this.bulletLayer.addChild(bullet); // 将生成的子弹加入节点树
        return bullet;
    },

    destroyBullet: function destroyBullet(node) {
        this.bulletPool.put(node);
    }
});

cc._RF.pop();
},{}],"bullet":[function(require,module,exports){
"use strict";
cc._RF.push(module, '818b5lIKIdL7puCVfq2U/20', 'bullet');
// Script\wujin\bullet.js

"use strict";

var State = cc.Enum({
    NONE: 0,
    RED: 1,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
    PURPLE: 7
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1000,
        power: 1,
        canTututu: false, // 穿透 黄
        canFire: false, // 灼烧掉血 绿 
        canFreeze: false, // 减速 青
        canBiubiu: false, // 快速攻击 紫
        canCut: false, //斩杀线以下直接消灭敌人
        state: {
            type: State,
            default: State.NONE,
            visible: true
        }
    },

    findRoad: function findRoad(start_pos, end_pos, state) {
        switch (state) {
            case 0:
                this.power = 1;
                this.state = State.NONE;
                //cc.audioEngine.play(this.audioEngine0, false, 1);
                B.game.bulletSource0.play();
                break;
            case 1:
                this.power = 3;
                this.state = State.RED;
                //cc.audioEngine.play(this.audioEngine1, false, 1);
                B.game.bulletSource1.play();
                break;
            case 3:
                this.canTututu = true;
                this.state = State.YELLOW;
                //cc.audioEngine.play(this.audioEngine2, false, 1);
                B.game.bulletSource2.play();
                break;
            case 4:
                this.canFire = true;
                this.state = State.GREEN;
                //cc.audioEngine.play(this.audioEngine3, false, 1);
                B.game.bulletSource3.play();
                break;
            case 5:
                this.canFreeze = true;
                this.state = State.CYAN;
                //cc.audioEngine.play(this.audioEngine4, false, 1);
                B.game.bulletSource4.play();
                break;
            case 7:
                //cc.audioEngine.play(this.audioEngine5, false, 1);
                this.canCut = true;
                this.state = State.PURPLE;
                B.game.bulletSource5.play();
                break;
            case 2:
                //cc.audioEngine.play(this.audioEngine6, false, 1);
                B.game.bulletSource6.play();
                break;
        }

        this.start_pos = start_pos;
        this.end_pos = end_pos;

        this.posSub = end_pos.sub(start_pos);
        var len = cc.pLength(this.posSub);

        this.speed_x = this.speed * this.posSub.x / len;
        this.speed_y = this.speed * this.posSub.y / len;

        var angle = cc.pToAngle(this.posSub) / Math.PI * 180;
        this.node.rotation = -angle - 90;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.tag === 444) {
            B.bulletManager.destroyBullet();
        }
    },

    update: function update(dt) {
        //console.log("帧率"+dt);
        this.node.x += this.speed_x * dt;
        this.node.y += this.speed_y * dt;
    }

});

cc._RF.pop();
},{}],"enemyManager":[function(require,module,exports){
"use strict";
cc._RF.push(module, '29dberugO1KSYJWfTxrgzG/', 'enemyManager');
// Script\wujin\enemyManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab,
        enemyPrefab2: cc.Prefab,
        enemyLayer: cc.Node
    },

    init: function init(game) {
        this.game = game;
        B.enemyManager = this;
        this.enemyPool = new cc.NodePool();
        this.enemyPool2 = new cc.NodePool();
        var initCount = 15;
        //蛇精
        for (var i = 0; i < initCount; ++i) {
            var enemy = cc.instantiate(this.enemyPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }
        //蝎子精
        for (var _i = 0; _i < initCount; ++_i) {
            var enemy2 = cc.instantiate(this.enemyPrefab2); // 创建节点
            this.enemyPool2.put(enemy2); // 通过 putInPool 接口放入对象池
        }
        // 初始产生5个敌人
        this.schedule(function () {
            this.createEnemy(1);
        }, 1, 4, 0);
    },

    createEnemy: function createEnemy(enemyType) {
        if (enemyType == 1) {
            var enemy = null;
            if (this.enemyPool.size() > 0) {
                // 通过 size 接口判断对象池中是否有空闲的对象
                enemy = this.enemyPool.get();
            } else {
                // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy = cc.instantiate(this.enemyPrefab);
            }
            enemy.getComponent('enemy').init(this.game); //接下来就可以调用 enemy 身上的脚本进行初始化
            this.enemyLayer.addChild(enemy); // 将生成的敌人加入节点树
        }
        if (enemyType == 2) {
            var enemy2 = null;
            if (this.enemyPool2.size() > 0) {
                // 通过 size 接口判断对象池中是否有空闲的对象
                enemy2 = this.enemyPool2.get();
            } else {
                // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy2 = cc.instantiate(this.enemyPrefab2);
            }
            enemy2.getComponent('enemy').init(this.game); //接下来就可以调用 enemy 身上的脚本进行初始化
            this.enemyLayer.addChild(enemy2); // 将生成的敌人加入节点树
        }
    },

    destroyEnemy: function destroyEnemy(node) {
        if (B.game.enemyType == 1) {
            this.enemyPool.put(node);
        } else {
            this.enemyPool2.put(node);
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{}],"enemy":[function(require,module,exports){
"use strict";
cc._RF.push(module, '59947gxR7RD4bjJet3n67f+', 'enemy');
// Script\wujin\enemy.js

"use strict";

var State = cc.Enum({
    NONE: 0,
    WALK: 1,
    DEAD: 2
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
        blood: 6,
        state: {
            type: State,
            default: State.NONE,
            visible: false
        },
        bloodBar: cc.ProgressBar

    },

    // use this for initialization
    init: function init(game) {
        this.game = game;
        this.state = State.WALK;
        this.speed = B.game.enemySpeed;
        this.blood = B.game.enemyBlood;
        this.findRoad();
    },

    findRoad: function findRoad() {
        this.roadset = this.game.road_path;
        // console.log(this.roadset);
        // console.log(this.roadset[0].x);
        //只有一个点直接return
        if (this.roadset.length < 2) {
            return;
        }

        this.node.x = this.roadset[0].x - 480;
        this.node.y = this.roadset[0].y - 270;
        //下个点的索引
        this.next_step = 1;
        this.state = State.NONE;
        this.walkNext();
    },

    walkNext: function walkNext() {
        if (this.next_step >= this.roadset.length) {
            this.state = State.DEAD;
            this.enemyToPool();
            return;
        }

        this.state = State.WALK;
        var start_pos = this.node.getPosition();
        // console.log(start_pos.x);
        var dst_pos = cc.p(this.roadset[this.next_step]);
        dst_pos.x -= 480;
        dst_pos.y -= 270;
        //两个向量的差
        var dir = cc.pSub(dst_pos, start_pos);
        //dir的长度
        var len = cc.pLength(dir);

        //x方向速度
        this.vx = this.speed * dir.x / len;
        //y方向速度
        this.vy = this.speed * dir.y / len;

        //到达下一个点的时间
        this.total_time = len / this.speed;
        //当前行走时间
        this.now_time = 0;
    },

    walkUpdate: function walkUpdate(dt) {
        if (this.now_time >= this.total_time) {
            return;
        }

        this.now_time += dt;
        //加上dt后可能大于total_time,减去多余的时间
        if (this.now_time > this.total_time) {
            dt -= this.now_time - this.total_time;
        }

        this.node.x += this.vx * dt;
        this.node.y += this.vy * dt;

        if (this.now_time >= this.total_time) {
            this.next_step++;
            this.walkNext();
        }
    },

    enemyToPool: function enemyToPool() {
        this.bloodBar.progress = 1;
        this.blood = B.game.enemyBlood;
        this.speed = B.game.enemySpeed;
        this.node.color = cc.color(255, 255, 255);
        B.enemyManager.destroyEnemy(this.node);
    },

    //怪物掉血
    hurt: function hurt(power) {
        this.blood -= power;
        this.bloodBar.progress -= 1 / B.game.enemyBlood * power;
        // console.log("total blood " + B.game.enemyBlood);
        if (this.blood <= 0) {
            //cc.audioEngine.play(this.audioSource, false, 1);
            B.game.enemySource.play();
            this.game.gainCoin();
            this.game.gainScore();
            this.enemyToPool();
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.tag === 333) {
            //碰到子弹
            // 根据子弹的属性
            // console.log("enemy109" + other.getComponent("bullet").state);
            switch (other.getComponent("bullet").state) {
                case 0:
                    //正常
                    this.hurt(other.getComponent("bullet").power);
                    B.bulletManager.destroyBullet(other.node);
                    break;
                case 1:
                    //攻击增加
                    this.hurt(other.getComponent("bullet").power);
                    B.bulletManager.destroyBullet(other.node);
                    break;
                case 3:
                    //穿透
                    this.hurt(other.getComponent("bullet").power);
                    break;
                case 4:
                    //掉血
                    B.bulletManager.destroyBullet(other.node);
                    this.node.color = cc.color(0, 255, 0);
                    this.scheduleOnce(function () {
                        this.node.color = cc.color(255, 255, 255);
                    }, 4);

                    this.schedule(function () {
                        if (this.blood >= 1.2) {
                            this.blood--;
                            this.bloodBar.progress -= 1 / B.game.enemyBlood * other.getComponent("bullet").power;
                        } else {
                            this.game.gainCoin();
                            this.game.gainScore();
                            this.enemyToPool();
                        }
                    }, 1, 3, 0);

                    break;
                case 5:
                    //减速
                    B.bulletManager.destroyBullet(other.node);
                    this.node.color = cc.color(0, 255, 255);
                    this.scheduleOnce(function () {
                        this.node.color = cc.color(255, 255, 255);
                        this.speed = B.game.enemySpeed;
                    }, 7);
                    this.speed = this.speed * 0.7;
                    this.hurt(other.getComponent("bullet").power);
                    break;
                case 7:
                    //斩杀
                    B.bulletManager.destroyBullet(other.node);
                    if (this.blood <= B.game.enemyBlood * 0.3) {
                        this.enemyToPool();
                    }
                    break;
            }
        } else if (other.tag === 222) {
            //碰到爷爷
            this.enemyToPool();
            this.game.downFatherBlood();
        }
    },

    //dt 距离上一次刷新过去的时间
    update: function update(dt) {
        if (this.state == State.WALK) {
            this.walkUpdate(dt);
        }
    }
});

cc._RF.pop();
},{}],"globals":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'ccd8aLVBpdNQoYtKciONo6/', 'globals');
// Script\wujin\globals.js

"use strict";

window.B = {
    // singletons
    bulletManager: null, //公共方法
    enemyManager: null,
    game: null
};

cc._RF.pop();
},{}],"invisible":[function(require,module,exports){
"use strict";
cc._RF.push(module, '49db4BAhCBIZ5Avs0C13yB3', 'invisible');
// Script\wujin\invisible.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        liuwa: cc.Node,
        visibleState: 0, //0表示爷爷为可见状态，1表示爷爷为隐身状态
        blueState: 0 },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //如果爷爷是正常状态，显示葫芦
            if (self.visibleState == 0 && self.blueState == 0) {
                console.log("隐身");
                self.liuwa.active = true;
                self.blueState = 1;
            } else if (self.visibleState == 0 && self.blueState == 1) {
                self.liuwa.active = false;
                self.blueState = 0;
            }
        });
    }

});

cc._RF.pop();
},{}],"load":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'e6e34fnLPNFJahER82sbJHL', 'load');
// Script\load.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        top: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        var minOpacity = 0;
        var timeIn = 40;
        this.schedule(function () {
            timeIn--;
            this.top.opacity = minOpacity + Math.floor(0.04 * (255 - minOpacity));
            minOpacity = this.top.opacity;
            if (timeIn === 0) {
                cc.director.loadScene('main');
            }
        }, 0.05);
    }

});

cc._RF.pop();
},{}],"main":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'db4c0AVJwtJ4J7Mny9luxfn', 'main');
// Script\main.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bangzhuBoard: cc.Node,
        guanyuBoard: cc.Node,
        playBtn: cc.Node,
        bangzhuBtn: cc.Node,
        guanyuBtn: cc.Node,
        audioSource: {
            url: cc.AudioClip,
            default: null
        },
        audioSource1: {
            url: cc.AudioClip,
            default: null
        },
        audioSource2: {
            url: cc.AudioClip,
            default: null
        }

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.audioID = cc.audioEngine.play(this.audioSource, true, 1);
    },
    // 开始游戏
    onBtnPlay: function onBtnPlay() {
        cc.audioEngine.play(this.audioSource1, false, 1);
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("wujin");
    },

    // 帮助按钮
    onBtnBZ: function onBtnBZ() {
        cc.audioEngine.play(this.audioSource1, false, 1);
        this.bangzhuBoard.active = true;
        this.playBtn.active = false;
        this.bangzhuBtn.active = false;
        this.guanyuBtn.active = false;
    },
    // 关于按钮
    onBtnGY: function onBtnGY() {
        cc.audioEngine.play(this.audioSource1, false, 1);
        this.guanyuBoard.active = true;
        this.playBtn.active = false;
        this.bangzhuBtn.active = false;
        this.guanyuBtn.active = false;
    },
    // 返回按钮
    onBtnBack: function onBtnBack() {
        cc.audioEngine.play(this.audioSource2, false, 1);
        this.guanyuBoard.active = false;
        this.bangzhuBoard.active = false;
        this.playBtn.active = true;
        this.bangzhuBtn.active = true;
        this.guanyuBtn.active = true;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{}],"tower":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'e0d26F6OvtL0I66ML97BoLM', 'tower');
// Script\wujin\tower.js

"use strict";

var State = cc.Enum({
    NONE: 0,
    RED: 1,
    ORANGE: 2,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
    PURPLE: 7
});

cc.Class({
    extends: cc.Component,

    properties: {
        attackDst: 200,
        bulletPrefab: cc.Prefab,
        state: {
            type: State,
            default: State.NONE,
            visible: false
        }

    },

    init: function init() {
        this.enemyLayer = cc.find("Canvas/enemyLayer");
        this.attack();
    },

    //炮塔攻击
    attack: function attack() {
        //炮塔的位置
        this.start_pos = this.node.getPosition();
        this.schedule(function () {
            switch (this.state) {
                case 0:
                    //还原炮塔发射子弹的速度和攻击距离
                    this.attackSpeed = 100;
                    this.attackDst = 200;
                    break;
                case 2:
                    //攻击距离加倍
                    this.attackDst = 600;
                    break;
            }
            this.getBullet();
        }, 1);
    },

    // 使用炮塔位置和敌人位置生成一个子弹
    getBullet: function getBullet() {
        var cannons = this.enemyLayer.getChildren();
        // enemy的位置(寻找最短距离enemy)
        // var end_pos = cannon[0].getPosition();
        var minDst = 1000;
        var tempDst = 0;
        var end_pos = cc.Vec2();
        for (var i = 0; i < cannons.length; ++i) {
            tempDst = cc.pLength(cc.pSub(this.start_pos, cannons[i].getPosition()));
            // console.log("tempDst " + tempDst);
            if (tempDst < minDst) {
                minDst = tempDst;
                end_pos = cannons[i].getPosition();
            }
        }
        // console.log("minDst " + minDst);
        // console.log("attackDst " + this.attackDst);
        if (minDst <= this.attackDst) {
            // 进行子弹的初始化
            var bullet = B.bulletManager.createBullet();
            bullet.setPosition(this.start_pos);
            bullet.getComponent("bullet").findRoad(this.start_pos, end_pos, this.state);
        }
    }

});

cc._RF.pop();
},{}],"weapon":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'f4ad1wmNtJLNIVfGZS8usGq', 'weapon');
// Script\wujin\weapon.js

"use strict";

var State = cc.Enum({
    NONE: 0,
    RED: 1,
    ORANGE: 2,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
    PURPLE: 7
});

cc.Class({
    extends: cc.Component,

    properties: {
        towerPrefab: cc.Prefab,
        btnState: 0,
        btnPlus: cc.Node,
        towerLayer: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.weaponLayer = cc.find("Canvas/weaponLayer");
        this.abilityLayer = cc.find("Canvas/abilityLayer");
        this.goldLess = cc.find("Canvas/goldLess");
        this.globalState = 0;

        //设置能力子节点的颜色
        this.setColor();

        var self = this;
        //监听事件
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //MOUSE_DOWN
            if (self.btnState == 0) {
                // 显示所有可以放置炮塔的btn
                self.showAllBtn(self);
                //隐藏能力子节点
                self.hideAllAbility(self);
            } else if (self.btnState == 1) {
                // 放置一个炮塔              
                if (B.game.canBuy(B.game.towerCoin)) {
                    B.game.downCoin(B.game.towerCoin);
                    var tower = null;
                    self.btnPlus.active = false;
                    tower = cc.instantiate(self.towerPrefab);
                    self.towerLayer.addChild(tower);
                    tower.setPosition(self.node.getPosition());
                    self.btnState = 2;
                    B.game.putSource.play();
                    tower.getComponent('tower').init();
                } else {
                    self.scheduleOnce(function () {
                        self.goldLess.opacity = 255;
                        var action = cc.fadeTo(1, 0);
                        self.goldLess.runAction(action);
                    }, 0);
                }
                //隐藏其它按钮
                self.hideAllWeaponBtn(self);
            } else if (self.btnState == 2) {
                // buff
                //显示buff列表，选择buff后进入ability中的事件监听
                self.btnState = 3;
                self.hideAllAbility(self);
                self.showAllAbility(self);
                self.hideAllWeaponBtn(self);
                //将按钮状态置为buff等待选择状态
            } else if (self.btnState == 3) {
                //没有选择buff则返回状态2
                self.hideAllAbility(self);
                self.hideAllWeaponBtn(self);
                self.btnState = 2;
            } else if (self.btnState == 4) {
                self.hideAllAbility(self);
                self.hideAllWeaponBtn(self);
            }
        });
    },

    hideAllAbility: function hideAllAbility(self) {
        //获得所有的能力子节点
        var a_children = self.abilityLayer.getChildren();
        if (a_children[0].getComponent("ability").btnNode.getComponent("weapon").btnState == 3) {
            a_children[0].getComponent("ability").btnNode.getComponent("weapon").btnState = 2;
        }
        //隐藏所有的能力子节点
        for (var i = 0; i < a_children.length; i++) {
            a_children[i].active = false;
        }
    },

    showAllAbility: function showAllAbility(self) {
        //获取btn的position
        var btn_pos = self.node.getPosition();

        //能力位置偏移量
        var ability_poss = [cc.p(-60, 60), cc.p(0, 60), cc.p(60, 60), cc.p(-60, -60), cc.p(0, -60), cc.p(60, -60)];
        var states = [State.RED, State.ORANGE, State.YELLOW, State.GREEN, State.CYAN, State.PURPLE];
        //获得所有的能力子节点
        var a_children = self.abilityLayer.getChildren();

        //显示所有的能力子节点
        for (var i = 0; i < B.game.buffNum; i++) {

            a_children[i].active = true;

            //对边界上的能力子节点的位置进行处理
            if (btn_pos.x < -400) {
                a_children[i].setPosition(cc.p(btn_pos.x + ability_poss[i].x + 60, btn_pos.y + ability_poss[i].y));
            } else if (btn_pos.x > 400) {
                a_children[i].setPosition(cc.p(btn_pos.x + ability_poss[i].x - 60, btn_pos.y + ability_poss[i].y));
            } else {
                a_children[i].setPosition(cc.p(btn_pos.x + ability_poss[i].x, btn_pos.y + ability_poss[i].y));
            }
            a_children[i].getComponent("ability").state = states[i];
            a_children[i].getComponent('ability').parentPos = self.node.getPosition();
            a_children[i].getComponent('ability').btnNode = self.node;
            if (a_children[i].getComponent('ability').canBuyAbility() == 0) {
                self.btnState = 2;
                self.hideAllAbility(self);
            }
        }
    },

    //设置子节点颜色
    setColor: function setColor() {
        //颜色数组
        var colors = [cc.color(255, 0, 0), cc.color(255, 156, 0), cc.color(255, 255, 0), cc.color(0, 255, 0), cc.color(0, 255, 255), cc.color(255, 0, 255)];

        var a_children = this.abilityLayer.getChildren();
        for (var i = 0; i < a_children.length; i++) {
            a_children[i].color = colors[i];
        }
    },

    //显示可以安装武器塔的按钮
    showAllBtn: function showAllBtn(node) {
        var children = node.weaponLayer.getChildren();
        children[0].getComponent('weapon').globalState = 1;
        var tempNode = null;
        for (var i = 0; i < children.length; i++) {
            tempNode = children[i].getComponent('weapon');
            if (tempNode.btnState == 0) {
                tempNode.btnPlus.active = true;
                tempNode.btnState = 1;
            }
        }
    },

    //隐藏可以安装武器塔的按钮
    hideAllWeaponBtn: function hideAllWeaponBtn(node) {
        node.node.getComponent('weapon').globalState = 0;
        var children = node.weaponLayer.getChildren();
        children[0].getComponent('weapon').globalState = 0;
        var tempNode = null;
        for (var i = 0; i < children.length; i++) {
            tempNode = children[i].getComponent('weapon');
            if (tempNode.btnState == 1) {
                tempNode.btnPlus.active = false;
                tempNode.btnState = 0;
            }
        }
    },
    globalBtn: function globalBtn() {
        if (this.globalState == 0) {
            this.showAllBtn(this);
            //隐藏能力子节点
            this.hideAllAbility(this);
        } else {
            this.hideAllWeaponBtn(this);
            //隐藏能力子节点
            this.hideAllAbility(this);
        }
    }

});

cc._RF.pop();
},{}]},{},["begin","load","main","Blue","Game","ability","bullet","bulletManager","enemy","enemyManager","globals","invisible","tower","weapon"]);
