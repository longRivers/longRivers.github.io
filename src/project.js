require=function e(t,i,n){function o(a,s){if(!i[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(c)return c(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var r=i[a]={exports:{}};t[a][0].call(r.exports,function(e){var i=t[a][1][e];return o(i?i:e)},r,r.exports,e,t,i,n)}return i[a].exports}for(var c="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({Blue:[function(e,t,i){"use strict";cc._RF.push(t,"a8ed7aZRg1FaquyQLDVP/H/","Blue"),cc.Class({"extends":cc.Component,properties:{parentNode:cc.Node,coins:300},onLoad:function(){var e=this;e.node.on(cc.Node.EventType.TOUCH_START,function(t){B.game.canBuy(e.coins)&&(B.game.downCoin(e.coins),e.parentNode.opacity=100,e.parentNode.getComponent(cc.PolygonCollider).tag=1e3,e.parentNode.getComponent("invisible").visibleState=1,e.parentNode.getComponent("invisible").scheduleOnce(function(){e.parentNode.opacity=255,e.parentNode.getComponent(cc.PolygonCollider).tag=222,e.parentNode.getComponent("invisible").visibleState=0},3)),e.node.active=!1})}}),cc._RF.pop()},{}],Game:[function(e,t,i){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}cc._RF.push(t,"991b1gyuapKy5i1kcPk4b7T","Game");var o,c=e("enemyManager"),a=e("bulletManager");cc.Class({"extends":cc.Component,properties:(o={enemyManager:c,bulletManager:a,gameOverMenu:cc.Node,setMenu:cc.Node,zantingTip:cc.Node,scoreLab:cc.Label,coinsLab:cc.Label,timeLab:cc.Label,bloodLab:cc.Label,boshuLab:cc.Label,reStartBtn:cc.Button,backBtn:cc.Button,ygzzjj:cc.Node,ydbygzzjj:cc.Node,grandFather:cc.Node,enemyLayer:cc.Node,daojishiLab:cc.Label,unlockBuffTip:cc.Node,audioEngine:{url:cc.AudioClip,"default":null},audioEngine1:{url:cc.AudioClip,"default":null},audioEngine2:{url:cc.AudioClip,"default":null},audioEngine3:{url:cc.AudioClip,"default":null},audioEngine4:{url:cc.AudioClip,"default":null},bulletSource0:{type:cc.AudioSource,"default":null}},n(o,"bulletSource0",{type:cc.AudioSource,"default":null}),n(o,"bulletSource1",{type:cc.AudioSource,"default":null}),n(o,"bulletSource2",{type:cc.AudioSource,"default":null}),n(o,"bulletSource3",{type:cc.AudioSource,"default":null}),n(o,"bulletSource4",{type:cc.AudioSource,"default":null}),n(o,"bulletSource5",{type:cc.AudioSource,"default":null}),n(o,"bulletSource6",{type:cc.AudioSource,"default":null}),n(o,"enemySource",{type:cc.AudioSource,"default":null}),n(o,"unlockSource",{type:cc.AudioSource,"default":null}),n(o,"deadSource",{type:cc.AudioSource,"default":null}),n(o,"hurtSource",{type:cc.AudioSource,"default":null}),n(o,"putSource",{type:cc.AudioSource,"default":null}),n(o,"clickSource",{type:cc.AudioSource,"default":null}),o),onLoad:function(){this.audioID=cc.audioEngine.play(this.audioEngine4,!0,1),this.shezhiBtn=0,cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(e,t){e==cc.KEY.back&&cc.director.loadScene("main")}},this.node),B.game=this,this.road_path=[cc.p(125,0),cc.p(125,110),cc.p(355,110),cc.p(355,240),cc.p(125,240),cc.p(125,375),cc.p(275,375),cc.p(275,440),cc.p(680,440),cc.p(680,375),cc.p(840,375),cc.p(840,240),cc.p(605,240),cc.p(605,110),cc.p(960,110)],this.daojishi=3,this.daojishiLab.string=this.daojishi,this.schedule(function(){this.daojishi--,0==this.daojishi?this.daojishiLab.string="开始游戏!":this.daojishiLab.string=this.daojishi,this.daojishi==-1&&(this.daojishiLab.node.active=!1,this.startGame())},1,3,0)},startGame:function(){this.score=0,this.scoreLab.string=this.score,this.coin=600,this.coinsLab.string=this.coin,this.towerCoin=150,this.fatherBlood=10,this.bloodLab.string=this.fatherBlood,this.time=30,this.timeLab.string=this.time+" s",this.boshu=1,this.perDaBo=5,this.boshuLab.string=this.boshu,this.getCoin=80,this.musicFlag=1,this.lockScore=500,this.buffNum=1,this.perAttackNum=4,this.enemyBlood=6,this.enemySpeed=100,this.buffTime=10,this.enemyType=1,cc.director.getCollisionManager().enabled=!0,this.enemyManager.init(this),this.bulletManager.init(this),this.cannons=this.enemyManager.enemyLayer.getChildren(),this.schedule(function(){15==this.enemyManager.enemyPool.size()&&15==this.enemyManager.enemyPool2.size()&&(this.time=30,this.nextAttack())},5),this.schedule(function(){0==this.time&&(this.time=30,this.nextAttack()),this.time--,this.timeLab.string=this.time+"s"},1)},stopGame:function(){this.clickSource.play(),cc.audioEngine.play(this.audioEngine3,!1,1),this.gameOverMenu.active=!0,cc.director.getCollisionManager().enabled=!1},onBtnExit:function(){this.clickSource.play(),cc.game.end()},onBtnSet:function(){this.clickSource.play(),0==this.shezhiBtn?(this.setMenu.active=!0,this.shezhiBtn=1):(this.setMenu.active=!1,this.shezhiBtn=0)},onBtnOffMusic:function(){1==this.musicFlag?(this.musicFlag=0,cc.audioEngine.pauseAll()):(this.musicFlag=1,cc.audioEngine.resumeAll()),this.setMenu.active=!1},backMain:function(){this.clickSource.play(),cc.game.resume(),cc.audioEngine.stop(this.audioID),cc.director.loadScene("main")},reStart:function(){this.clickSource.play(),cc.game.resume(),cc.audioEngine.stop(this.audioID),cc.director.loadScene("wujin")},onBtnPauseGame:function(){this.clickSource.play(),this.zantingTip.active=!0,cc.game.pause(),this.setMenu.active=!1},onBtnGoon:function(){this.clickSource.play(),this.zantingTip.active=!1,cc.game.resume(),this.setMenu.active=!1},gainCoin:function(){this.coin+=this.getCoin,this.coinsLab.string=this.coin},gainScore:function(){this.score+=this.getCoin,this.scoreLab.string=this.score,this.score>this.lockScore&&(this.unlockBuff(),this.lockScore=2*this.lockScore)},canBuy:function(e){return this.coin-e>=0?1:0},unlockBuff:function(){this.unlockSource.play(),this.buffNum<6&&(this.unlockBuffTip.active=!0,this.scheduleOnce(function(){this.unlockBuffTip.active=!1},1),this.buffNum++),this.perAttackNum<9&&this.perAttackNum++},downCoin:function(e){this.coin-=e,this.coinsLab.string=this.coin},downFatherBlood:function(){this.fatherBlood--,this.hurtSource.play(),0==this.fatherBlood&&(this.grandFather.color=cc.Color.GRAY,this.deadSource.play(),this.stopGame()),this.bloodLab.string=this.fatherBlood},nextAttack:function(){this.boshu++,this.boshuLab.string=this.boshu,this.enemyType=3-this.enemyType;var e=this.perAttackNum;this.getCoin<=130&&(this.getCoin+=5),this.enemyBlood<=27&&(this.enemyBlood+=3),this.enemySpeed<=200&&(this.enemySpeed+=5),this.boshu%this.perDaBo==0?(this.perAttackNum=this.perAttackNum+this.perAttackNum/2,this.ydbygzzjj.active=!0,this.scheduleOnce(function(){this.ydbygzzjj.active=!1},1)):(this.ygzzjj.active=!0,this.scheduleOnce(function(){this.ygzzjj.active=!1},1)),this.schedule(function(){this.enemyManager.createEnemy(this.enemyType)},1,this.perAttackNum,0),this.perAttackNum=e}}),cc._RF.pop()},{bulletManager:"bulletManager",enemyManager:"enemyManager"}],ability:[function(e,t,i){"use strict";cc._RF.push(t,"9dbc6VfQqlGDKsxN02KaMN7","ability");var n=cc.Enum({NONE:0,RED:1,ORANGE:2,YELLOW:3,GREEN:4,CYAN:5,PURPLE:7});cc.Class({"extends":cc.Component,properties:{coins:100,towerLayer:cc.Node,parentPos:cc.Vec2,abilityLayer:cc.Node,state:{type:n,"default":n.NONE,visible:!1},btnNode:cc.Node,eventState:0,abilitySource:{type:cc.AudioSource,"default":null}},canBuyAbility:function(){return B.game.canBuy(this.coins)?void this.getBuff():0},getBuff:function(){var e=this;this.preWeaponBtn=this.btnNode,0==e.eventState&&(e.eventState=1,e.node.on(cc.Node.EventType.TOUCH_START,function(t){e.abilitySource.play(),B.game.downCoin(e.coins),e.btnNode.getComponent("weapon").btnState=4;var i=e.node.getComponent("ability").preWeaponBtn;i.getComponent("weapon").scheduleOnce(function(){i.getComponent("weapon").btnState=2},B.game.buffTime);for(var o=e.towerLayer.getChildren(),c=0;c<o.length;++c){var a=o[c].getPosition(),s=e.parentPos;if(a.x==s.x&&a.y==s.y){o[c].color=this.color,o[c].getComponent("tower").state=e.state,o[c].getComponent("tower").scheduleOnce(function(){o[c].color=cc.color(255,255,255),o[c].getComponent("tower").state=n.NONE},B.game.buffTime);for(var l=e.abilityLayer.getChildren(),u=0;u<l.length;++u)l[u].active=!1;break}}}))}}),cc._RF.pop()},{}],begin:[function(e,t,i){"use strict";cc._RF.push(t,"2a2b4Kkz4xFtb3X1y2Sm8Sf","begin"),cc.Class({"extends":cc.Component,properties:{storyBoard:cc.Node,btnPlay:cc.Node,btnStory:cc.Node,audioSource:{url:cc.AudioClip,"default":null},audioSource1:{url:cc.AudioClip,"default":null}},onLoad:function(){this.audioID=cc.audioEngine.play(this.audioSource,!0,1)},onBtnStory:function(){this.storyBoard.active=!0,this.btnPlay.active=!1,this.btnStory.active=!1},onBtnPlay:function(){cc.audioEngine.stop(this.audioID),cc.director.loadScene("load")},onBtnBack:function(){cc.audioEngine.play(this.audioSource1,!1,1),this.storyBoard.active=!1,this.btnPlay.active=!0,this.btnStory.active=!0}}),cc._RF.pop()},{}],bulletManager:[function(e,t,i){"use strict";cc._RF.push(t,"9ee56V/0aJOALo+EaHkM63q","bulletManager");cc.Class({"extends":cc.Component,properties:{bulletPrefab:cc.Prefab,bulletLayer:cc.Node},init:function(e){this.game=e,B.bulletManager=this,this.bulletPool=new cc.NodePool;for(var t=50,i=0;i<t;++i){var n=cc.instantiate(this.bulletPrefab);this.bulletPool.put(n)}},createBullet:function(){var e=null;return e=this.bulletPool.size()>0?this.bulletPool.get():cc.instantiate(this.bulletPrefab),this.bulletLayer.addChild(e),e},destroyBullet:function(e){this.bulletPool.put(e)}});cc._RF.pop()},{}],bullet:[function(e,t,i){"use strict";cc._RF.push(t,"818b5lIKIdL7puCVfq2U/20","bullet");var n=cc.Enum({NONE:0,RED:1,YELLOW:3,GREEN:4,CYAN:5,PURPLE:7});cc.Class({"extends":cc.Component,properties:{speed:1e3,power:1,canTututu:!1,canFire:!1,canFreeze:!1,canBiubiu:!1,canCut:!1,state:{type:n,"default":n.NONE,visible:!0}},findRoad:function(e,t,i){switch(i){case 0:this.power=1,this.state=n.NONE,B.game.bulletSource0.play();break;case 1:this.power=3,this.state=n.RED,B.game.bulletSource1.play();break;case 3:this.canTututu=!0,this.state=n.YELLOW,B.game.bulletSource2.play();break;case 4:this.canFire=!0,this.state=n.GREEN,B.game.bulletSource3.play();break;case 5:this.canFreeze=!0,this.state=n.CYAN,B.game.bulletSource4.play();break;case 7:this.canCut=!0,this.state=n.PURPLE,B.game.bulletSource5.play();break;case 2:B.game.bulletSource6.play()}this.start_pos=e,this.end_pos=t,this.posSub=t.sub(e);var o=cc.pLength(this.posSub);this.speed_x=this.speed*this.posSub.x/o,this.speed_y=this.speed*this.posSub.y/o;var c=cc.pToAngle(this.posSub)/Math.PI*180;this.node.rotation=-c-90},onCollisionEnter:function(e,t){444===e.tag&&B.bulletManager.destroyBullet()},update:function(e){this.node.x+=this.speed_x*e,this.node.y+=this.speed_y*e}}),cc._RF.pop()},{}],enemyManager:[function(e,t,i){"use strict";cc._RF.push(t,"29dberugO1KSYJWfTxrgzG/","enemyManager"),cc.Class({"extends":cc.Component,properties:{enemyPrefab:cc.Prefab,enemyPrefab2:cc.Prefab,enemyLayer:cc.Node},init:function(e){this.game=e,B.enemyManager=this,this.enemyPool=new cc.NodePool,this.enemyPool2=new cc.NodePool;for(var t=15,i=0;i<t;++i){var n=cc.instantiate(this.enemyPrefab);this.enemyPool.put(n)}for(var o=0;o<t;++o){var c=cc.instantiate(this.enemyPrefab2);this.enemyPool2.put(c)}this.schedule(function(){this.createEnemy(1)},1,4,0)},createEnemy:function(e){if(1==e){var t=null;t=this.enemyPool.size()>0?this.enemyPool.get():cc.instantiate(this.enemyPrefab),t.getComponent("enemy").init(this.game),this.enemyLayer.addChild(t)}if(2==e){var i=null;i=this.enemyPool2.size()>0?this.enemyPool2.get():cc.instantiate(this.enemyPrefab2),i.getComponent("enemy").init(this.game),this.enemyLayer.addChild(i)}},destroyEnemy:function(e){1==B.game.enemyType?this.enemyPool.put(e):this.enemyPool2.put(e)}}),cc._RF.pop()},{}],enemy:[function(e,t,i){"use strict";cc._RF.push(t,"59947gxR7RD4bjJet3n67f+","enemy");var n=cc.Enum({NONE:0,WALK:1,DEAD:2});cc.Class({"extends":cc.Component,properties:{speed:100,blood:6,state:{type:n,"default":n.NONE,visible:!1},bloodBar:cc.ProgressBar},init:function(e){this.game=e,this.state=n.WALK,this.speed=B.game.enemySpeed,this.blood=B.game.enemyBlood,this.findRoad()},findRoad:function(){this.roadset=this.game.road_path,this.roadset.length<2||(this.node.x=this.roadset[0].x-480,this.node.y=this.roadset[0].y-270,this.next_step=1,this.state=n.NONE,this.walkNext())},walkNext:function(){if(this.next_step>=this.roadset.length)return this.state=n.DEAD,void this.enemyToPool();this.state=n.WALK;var e=this.node.getPosition(),t=cc.p(this.roadset[this.next_step]);t.x-=480,t.y-=270;var i=cc.pSub(t,e),o=cc.pLength(i);this.vx=this.speed*i.x/o,this.vy=this.speed*i.y/o,this.total_time=o/this.speed,this.now_time=0},walkUpdate:function(e){this.now_time>=this.total_time||(this.now_time+=e,this.now_time>this.total_time&&(e-=this.now_time-this.total_time),this.node.x+=this.vx*e,this.node.y+=this.vy*e,this.now_time>=this.total_time&&(this.next_step++,this.walkNext()))},enemyToPool:function(){this.bloodBar.progress=1,this.blood=B.game.enemyBlood,this.speed=B.game.enemySpeed,this.node.color=cc.color(255,255,255),B.enemyManager.destroyEnemy(this.node)},hurt:function(e){this.blood-=e,this.bloodBar.progress-=1/B.game.enemyBlood*e,this.blood<=0&&(B.game.enemySource.play(),this.game.gainCoin(),this.game.gainScore(),this.enemyToPool())},onCollisionEnter:function(e,t){if(333===e.tag)switch(e.getComponent("bullet").state){case 0:this.hurt(e.getComponent("bullet").power),B.bulletManager.destroyBullet(e.node);break;case 1:this.hurt(e.getComponent("bullet").power),B.bulletManager.destroyBullet(e.node);break;case 3:this.hurt(e.getComponent("bullet").power);break;case 4:B.bulletManager.destroyBullet(e.node),this.node.color=cc.color(0,255,0),this.scheduleOnce(function(){this.node.color=cc.color(255,255,255)},4),this.schedule(function(){this.blood>=1.2?(this.blood--,this.bloodBar.progress-=1/B.game.enemyBlood*e.getComponent("bullet").power):(this.game.gainCoin(),this.game.gainScore(),this.enemyToPool())},1,3,0);break;case 5:B.bulletManager.destroyBullet(e.node),this.node.color=cc.color(0,255,255),this.scheduleOnce(function(){this.node.color=cc.color(255,255,255),this.speed=B.game.enemySpeed},7),this.speed=.7*this.speed,this.hurt(e.getComponent("bullet").power);break;case 7:B.bulletManager.destroyBullet(e.node),this.blood<=.3*B.game.enemyBlood&&this.enemyToPool()}else 222===e.tag&&(this.enemyToPool(),this.game.downFatherBlood())},update:function(e){this.state==n.WALK&&this.walkUpdate(e)}}),cc._RF.pop()},{}],globals:[function(e,t,i){"use strict";cc._RF.push(t,"ccd8aLVBpdNQoYtKciONo6/","globals"),window.B={bulletManager:null,enemyManager:null,game:null},cc._RF.pop()},{}],invisible:[function(e,t,i){"use strict";cc._RF.push(t,"49db4BAhCBIZ5Avs0C13yB3","invisible"),cc.Class({"extends":cc.Component,properties:{liuwa:cc.Node,visibleState:0},onLoad:function(){var e=this;e.node.on(cc.Node.EventType.TOUCH_START,function(t){0==e.visibleState&&(e.liuwa.active=!0)})}}),cc._RF.pop()},{}],load:[function(e,t,i){"use strict";cc._RF.push(t,"e6e34fnLPNFJahER82sbJHL","load"),cc.Class({"extends":cc.Component,properties:{top:cc.Node},onLoad:function(){var e=0,t=40;this.schedule(function(){t--,this.top.opacity=e+Math.floor(.04*(255-e)),e=this.top.opacity,0===t&&cc.director.loadScene("main")},.05)}}),cc._RF.pop()},{}],main:[function(e,t,i){"use strict";cc._RF.push(t,"db4c0AVJwtJ4J7Mny9luxfn","main"),cc.Class({"extends":cc.Component,properties:{bangzhuBoard:cc.Node,guanyuBoard:cc.Node,playBtn:cc.Node,bangzhuBtn:cc.Node,guanyuBtn:cc.Node,audioSource:{url:cc.AudioClip,"default":null},audioSource1:{url:cc.AudioClip,"default":null},audioSource2:{url:cc.AudioClip,"default":null}},onLoad:function(){this.audioID=cc.audioEngine.play(this.audioSource,!0,1)},onBtnPlay:function(){cc.audioEngine.play(this.audioSource1,!1,1),cc.audioEngine.stop(this.audioID),cc.director.loadScene("wujin")},onBtnBZ:function(){cc.audioEngine.play(this.audioSource1,!1,1),this.bangzhuBoard.active=!0,this.playBtn.active=!1,this.bangzhuBtn.active=!1,this.guanyuBtn.active=!1},onBtnGY:function(){cc.audioEngine.play(this.audioSource1,!1,1),this.guanyuBoard.active=!0,this.playBtn.active=!1,this.bangzhuBtn.active=!1,this.guanyuBtn.active=!1},onBtnBack:function(){cc.audioEngine.play(this.audioSource2,!1,1),this.guanyuBoard.active=!1,this.bangzhuBoard.active=!1,this.playBtn.active=!0,this.bangzhuBtn.active=!0,this.guanyuBtn.active=!0}}),cc._RF.pop()},{}],tower:[function(e,t,i){"use strict";cc._RF.push(t,"e0d26F6OvtL0I66ML97BoLM","tower");var n=cc.Enum({NONE:0,RED:1,ORANGE:2,YELLOW:3,GREEN:4,CYAN:5,PURPLE:7});cc.Class({"extends":cc.Component,properties:{attackDst:200,bulletPrefab:cc.Prefab,state:{type:n,"default":n.NONE,visible:!1}},init:function(){this.enemyLayer=cc.find("Canvas/enemyLayer"),this.attack()},attack:function(){this.start_pos=this.node.getPosition(),this.schedule(function(){switch(this.state){case 0:this.attackSpeed=100,this.attackDst=200;break;case 2:this.attackDst=600}this.getBullet()},1)},getBullet:function(){for(var e=this.enemyLayer.getChildren(),t=1e3,i=0,n=cc.Vec2(),o=0;o<e.length;++o)i=cc.pLength(cc.pSub(this.start_pos,e[o].getPosition())),i<t&&(t=i,n=e[o].getPosition());if(t<=this.attackDst){var c=B.bulletManager.createBullet();c.setPosition(this.start_pos),c.getComponent("bullet").findRoad(this.start_pos,n,this.state)}}}),cc._RF.pop()},{}],weapon:[function(e,t,i){"use strict";cc._RF.push(t,"f4ad1wmNtJLNIVfGZS8usGq","weapon");var n=cc.Enum({NONE:0,RED:1,ORANGE:2,YELLOW:3,GREEN:4,CYAN:5,PURPLE:7});cc.Class({"extends":cc.Component,properties:{towerPrefab:cc.Prefab,btnState:0,btnPlus:cc.Node,towerLayer:cc.Node},onLoad:function(){this.weaponLayer=cc.find("Canvas/weaponLayer"),this.abilityLayer=cc.find("Canvas/abilityLayer"),this.setColor();var e=this;e.node.on(cc.Node.EventType.TOUCH_START,function(t){if(0==e.btnState)e.showAllBtn(e),e.hideAllAbility(e);else if(1==e.btnState){if(B.game.canBuy(B.game.towerCoin)){B.game.downCoin(B.game.towerCoin);var i=null;e.btnPlus.active=!1,i=cc.instantiate(e.towerPrefab),e.towerLayer.addChild(i),i.setPosition(e.node.getPosition()),e.btnState=2,B.game.putSource.play(),i.getComponent("tower").init()}e.hideAllWeaponBtn(e)}else 2==e.btnState?(e.btnState=3,e.hideAllAbility(e),e.showAllAbility(e),e.hideAllWeaponBtn(e)):3==e.btnState?(e.hideAllAbility(e),e.hideAllWeaponBtn(e),e.btnState=2):4==e.btnState&&(e.hideAllAbility(e),e.hideAllWeaponBtn(e))})},hideAllAbility:function(e){var t=e.abilityLayer.getChildren();3==t[0].getComponent("ability").btnNode.getComponent("weapon").btnState&&(t[0].getComponent("ability").btnNode.getComponent("weapon").btnState=2);for(var i=0;i<t.length;i++)t[i].active=!1},showAllAbility:function(e){for(var t=e.node.getPosition(),i=[cc.p(-60,60),cc.p(0,60),cc.p(60,60),cc.p(-60,-60),cc.p(0,-60),cc.p(60,-60)],o=[n.RED,n.ORANGE,n.YELLOW,n.GREEN,n.CYAN,n.PURPLE],c=e.abilityLayer.getChildren(),a=0;a<B.game.buffNum;a++)c[a].active=!0,t.x<-400?c[a].setPosition(cc.p(t.x+i[a].x+60,t.y+i[a].y)):t.x>400?c[a].setPosition(cc.p(t.x+i[a].x-60,t.y+i[a].y)):c[a].setPosition(cc.p(t.x+i[a].x,t.y+i[a].y)),c[a].getComponent("ability").state=o[a],c[a].getComponent("ability").parentPos=e.node.getPosition(),c[a].getComponent("ability").btnNode=e.node,0==c[a].getComponent("ability").canBuyAbility()&&(e.btnState=2,e.hideAllAbility(e))},setColor:function(){for(var e=[cc.color(255,0,0),cc.color(255,156,0),cc.color(255,255,0),cc.color(0,255,0),cc.color(0,255,255),cc.color(255,0,255)],t=this.abilityLayer.getChildren(),i=0;i<t.length;i++)t[i].color=e[i]},showAllBtn:function(e){for(var t=e.weaponLayer.getChildren(),i=null,n=0;n<t.length;n++)i=t[n].getComponent("weapon"),0==i.btnState&&(i.btnPlus.active=!0,i.btnState=1)},hideAllWeaponBtn:function(e){for(var t=e.weaponLayer.getChildren(),i=null,n=0;n<t.length;n++)i=t[n].getComponent("weapon"),1==i.btnState&&(i.btnPlus.active=!1,i.btnState=0)}}),cc._RF.pop()},{}]},{},["begin","load","main","Blue","Game","ability","bullet","bulletManager","enemy","enemyManager","globals","invisible","tower","weapon"]);