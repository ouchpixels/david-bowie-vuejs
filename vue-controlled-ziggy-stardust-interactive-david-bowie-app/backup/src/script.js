// Go full screen!
// Big thanks to @giana, the rotating starry canvas is her creation
// https://codepen.io/giana/pen/qbWNYy

new Vue ({
  
  el: '#app',
  data: function () {
    
    return {
      
      isMobile: false,
      
      mouseX: 0,
      distanceX: 0,
      maxDistanceX: 0,
      distNormalized: 0,
      
      startZiggy: 0,
      isRocketAnimated: false,
      isGhost: false,
      hoverSticker: false,
      hoverPlanet: false,
      colorIndex: 0
      
    }
    
  },
  
  created: function () {
    
    this.checkIfMobile();
    
  },
  
  mounted: function () {
    
    this.loadBackground();
    this.allAnimations();
    this.loadEvents();
    
  },
  
  methods: {
    
    checkIfMobile: function () {
      
      this.isMobile = window.orientation > -1;
      return;
      
    },
    
    loadBackground: function () {
      
      if ( this.isMobile ) {
        
        const body = document.body;
        body.classList.add('mobile');
        
      }  else  {
        
        this.makeStarCanvas( 'canvas' );
        
      }
      
    },
    
    allAnimations: function () {
      
      this.faceAnimation();
      this.hairAnimation();
      this.marsAnimation();
      if ( !this.isMobile ) {
        this.stickerAnimation();
      }
        
    },
    
    // ANIMATION TIMELINES
    
    faceAnimation: function () {
      
      let faceTL = new TimelineMax({repeat: -1, yoyo: true});
      
      faceTL
        .add('facestart')
        .to(['#eye-left', '#eye-right'], 1.25, {x: -15, ease: Linear.easeOut}, 'facestart')
        .add('lookright')
        .to(['#eye-left', '#eye-right'], 1.5, {x: 10, ease:Linear.easeOut}, 'lookright')
        .add('break')
        .to(['#eye-left', '#eye-right'], 0.8, {y: 2, ease: Linear.easeOut}, 'break')
        .add('lookcenter')
        .to(['#eye-left', '#eye-right'], 1, {x: -5, ease: Linear.easeOut}, 'lookcenter')
        .add('lookdown')
        .to(['#eye-left', '#eye-right'], 0.8, {y: 5, ease: Linear.easeOut}, 'lookdown')
      ;
      
      return faceTL;
      
    },
    
    hairAnimation: function () {
      
      let hairTL = new TimelineMax({repeat: -1, repeatDelay: 0.15, yoyo: true});
      
      hairTL
        .add('wigstart')
        .to(['#wig-left-1', '#wig-right-1'], 1.25, {transformOrigin: 'center center', rotation: -10, ease: Sine.easeIn}, 'wigstart')
        .to(['#wig-left-1-hair-1', '#wig-left-1-hair-2', '#wig-right-1-hair-2'], 1.25, {transformOrigin: 'center center', rotation: -5, ease: Sine.easeIn}, 'wigstart')
        .to('#wig-right-2', 1.25, {transformOrigin: 'left center', rotation: 10, ease: Sine.easeInOut}, 'wigstart')
        .to(['#wig-left-3', '#wig-right-3'], 1.25, {transformOrigin: 'bottom right', rotation: 5, ease: Sine.easeInOut}, 'wigstart')
      ;
      
      return hairTL;
      
    },
    
    marsAnimation: function () {
      
      let marsTL = new TimelineMax({repeat: -1, yoyo: true});
      let ziggyWavingTL = new TimelineMax({repeat: -1, yoyo: true});
      
      ziggyWavingTL
        .add('wavingstart')
        .to('#rocket-arm-ziggy', 0.75, {transformOrigin: 'center bottom', rotation: 30, ease: Power0.easeInOut}, 'wavingstart')  
      ;
      marsTL
        .add('startmars')
        .to('#mars-cloud-1', 3.5, {x: 50, transformOrigin: 'center center', ease: Linear.easeInOut}, 'startmars')
        .to('#mars-cloud-2', 3.5, {x: 55, transformOrigin: 'center center', ease: Linear.easeInOut}, 'startmars')
        .to('#mars-sun', 3.5, {x: -20, y: 15, transformOrigin: 'center center', ease: Sine.easeInOut}, 'startmars')
      ;
      
      return marsTL;
      
    },
    
    stickerAnimation: function () {
      
      let stickerTL = new TimelineMax({repeat: -1, yoyo: true});
      let planetTL = new TimelineMax({repeat: -1, yoyo: true});
      
      stickerTL
        .set('#sticker-letters', {transformOrigin: 'center center'})
        .set('#sticker', {transformOrigin: 'center center', scale: 1.1})
        .to('#sticker-letters', 15, {rotation: 360, ease: Linear.easeInOut})
      ;
      planetTL
        .add('planetstart')
        .to(['#planet-circle', '#planet-circle-overlay'], 15, {transformOrigin: 'center center', rotation: 360, ease: Linear.easeInOut}, 'planetstart')
      ;
      
      return {
        
        stickerTL,
        planetTL
        
      }
      
    },
    
    toggleRocket: function () {
      
      this.isRocketAnimated = !this.isRocketAnimated;
      
    },
    
    rocketAnimation: function () {
      
      if ( !this.isRocketAnimated ) {
        
        this.isRocketAnimated = !this.isRocketAnimated;
        
        let rocketTL = new TimelineMax({onComplete: this.toggleRocket});
        let rocketData = MorphSVGPlugin.pathDataToBezier('#rocket-flying-path',{align: '#rocket', offsetX: -100, offsetY: -100});

        rocketTL
          .add('firestart')
          .to(['#fire-big', '#fire-small'], 0.5, {y: 20, transformOrigin: 'center center', scale: 1.75, ease: Elastic.easeOut}, 'firestart')
          .add('rocketstart')
          .set('#rocket', {transformOrigin: '50% 50%'})
          .set('#rocket-inside', {transformOrigin: 'center center'})
          .set('#rocket-inside', {rotation: 90})
          .to('#rocket', 2.5, {bezier: {values: rocketData,type: 'cubic',autoRotate: true}}, 'rocketstart')
        ;
        
        return rocketTL;
        
      }  else  {
        
        console.log('Can\'t animate yet. Wait till the end of rocket animation!');
        
        return;
        
      }
      
    },
    
    ziggyAnimation: function () {
      
      let ziggyTL = new TimelineMax();

      const heroesPoints = "m 934.0889,1489.3007 c -8.38828,40.205 -110.2183,97.6924 -126.41995,42.0633 -30.42468,-104.4646 172.43524,-103.8034 256.84735,-147.6075 15.2242,-7.9005 119.0611,-90.5237 94.3426,-108.8483 -85.0401,-12.868 -155.3944,421.0205 -232.47652,350.3876 -40.68674,-45.2207 179.48842,-177.1183 227.01872,-207.8917 9.0065,-4.6563 88.8639,-52.0865 61.0306,-75.9073 -68.2301,-50.5811 -182.3193,243.35 -142.3507,258.165 53.1781,19.7113 176.7431,-129.3628 147.5109,-140.1983 -45.8748,-17.0042 -117.1438,92.5845 -71.8644,114.9625 71.2908,35.2336 147.5109,-72.9944 147.5109,-114.9625 0,-23.5122 -61.723,16.3768 -45.3881,22.4318 30.6835,11.3731 104.9198,-29.2638 94.5584,16.8238 -3.6692,16.3205 -14.6055,31.7062 -18.9118,47.6674 -12.0406,44.6308 32.9083,30.139 49.1705,0 9.3297,-17.291 22.6938,-71.8982 22.6938,-53.2755 0,19.9825 -24.2807,64.4752 -3.7822,72.9031 56.5921,23.268 94.8297,-173.5435 15.1292,-95.3347 -72.0307,70.6827 212.8831,1.7994 132.3816,-28.0397 -25.2637,-6.2215 -104.5629,126.8928 -22.6939,120.5705 50.6909,-3.9145 151.3741,-101.6029 124.817,-126.1784 -35.185,-32.5598 -46.1429,37.6691 -30.2586,72.9031 68.183,143.7556 -33.2094,149.4028 -71.8645,117.7666";
      
      console.log('Ziggy mouse-position dependent timeline start');
      
      ziggyTL
             // head and hands animation at the same time
             .add('headstart')
             .to('#head-right', 4, {x: 380, ease: Sine.easeInOut}, 'headstart')
             .to('#ellipse-inside-right', 4, {x: 460, ease: Sine.easeInOut}, 'headstart')
             .to('#head-left', 4, {x: -510, ease: Sine.easeInOut}, 'headstart')
             .to('#ellipse-inside-left', 4, {x: -430, ease: Sine.easeInOut}, 'headstart')
             .to('#hand-left', 14, {x: -380, y: 150, scale: 1.25, ease: Sine.easeInOut}, 'headstart')
             .to('#hand-right', 14, {x: 300, y: 150, scale: 1.25, ease: Sine.easeInOut, onComplete: this.rocketAnimation}, 'headstart') 
             // Mars landscape
             .to(['#mars-land-1', '#mars-land-2', '#mars-land-3', '#mars-sun', '#mars-mountains', '#rocket-shade', '#mars-cloud-1', '#mars-cloud-2'], 3, {fillOpacity: 1, ease: Power1.easeInOut}, 'headstart+=2')
             .to(['#spider-2'], 7, {x: -3, ease: Power1.easeInOut}, 'headstart+=5')
             .to('#space-planet', 5, {opacity: 0.4, ease: Power1.easeInOut}, 'headstart+=2')
             // space galaxy doodles
             .to(['#space-doodle-1', '#space-doodle-2', '#space-doodle-3', '#space-doodle-4', '#space-doodle-5', '#space-doodle-6', '#space-doodle-8', '#space-doodle-10', '#space-doodle-11', '#space-doodle-12', '#space-doodle-15', '#space-doodle-16'], 4, {fillOpacity: 0.2, ease: Power1.easeInOut}, 'headstart+=4') 
             .to(['#space-doodle-7', '#space-doodle-15', '#space-doodle-16'], 5, {strokeOpacity: 0.2, ease: Power1.easeInOut}, 'headstart+=6.5') 
             // 'We Can Be' drawing
             .to('.letters', 0, {autoAlpha: 1}, 'headstart+=4')
             .to('.letters', 0, {drawSVG: '0% 0%'}, 'headstart+=4')
             .staggerTo('.letters', 3.5, {drawSVG: '0 100%'}, 2, 'headstart+=4')
             .to('.letters-2', 0.5, {strokeOpacity: 1}, 'headstart+=15')
             // 'Heroes' drawing
             .to('#text-heroes', 15, {morphSVG: heroesPoints, y: 125, ease: Sine.easeInOut}, 'headstart+=0.5');
      
             return ziggyTL;
      
    },
    
    coordinates: function (e) {
      
      this.getMaxDistanceX('#ziggy-main');
      
      const drawing = document.querySelector('#ziggy-main');
      const drawingBox = drawing.getBoundingClientRect();
      const drawingXCenter = drawingBox.width / 2 + drawingBox.left;

      let pointerEvent = e;
      
      if ( e.targetTouches && e.targetTouches[0] ) {
        
        e.preventDefault();
        pointerEvent = e.targetTouches[0];
        this.mouseX = pointerEvent.pageX;
        
      }  else  {
        
        this.mouseX = e.clientX;
        
      }
      
      this.distanceX = Math.abs(this.mouseX - drawingXCenter).toFixed(2);
      this.distNormalized = this.normalize(this.distanceX, this.maxDistanceX + 0.5, 0);
      
      if (this.startZiggy == 0) {
        
        this.startZiggy = this.ziggyAnimation();
        
      }
      
      if (this.distNormalized > 0.95) {
        
        this.distNormalized = 1;
        
      }
      
      this.startZiggy.progress(1 - this.distNormalized).pause();
      
    }, // END OF ANIMATIONS
    
    // Generate starry space canvas
    // Thanks to @giana, code below is fully hers
    // https://codepen.io/giana/pen/qbWNYy
    
    makeStarCanvas: function ( canvasID ) {
      
      let canvas = document.getElementById( canvasID ),
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,

        hue = 7,
        stars = [],
        count = 0,
        maxStars = 200
      ;

      // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
      // Cache gradient
      let canvas2 = document.createElement('canvas'),
          ctx2 = canvas2.getContext('2d')
      ;

      canvas2.width = 100;
      canvas2.height = 100;
      let half = canvas2.width / 2,
          gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, '#fff');
      gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
      gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
      gradient2.addColorStop(1, 'transparent');

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();
      // End cache

      function random(min, max) {
        
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          let hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
        
      }

      function maxOrbit(x, y) {
        let max = Math.max(x, y),
          diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
      }

      let Star = function() {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 280000;
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
      };

      Star.prototype.draw = function() {
        let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
      }

      for ( let i = 0; i < maxStars; i++ ) {
        new Star();
      }

      function starAnimation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'hsla(' + hue + ', 75%, 13%, 1)';
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        };

        window.requestAnimationFrame(starAnimation);
      }
      
      return starAnimation();
      
    }, // END OF STARRY CANVAS
    
    resizeCanvas: function (e) {
      
      let canvas = document.querySelector('#canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.makeStarCanvas( 'canvas' );
      
    },
    
    normalize: function ( val, max, min ) {
      
      if ( max - min === 0 ) return 1;
      return ((val - min) / (max - min)).toFixed(2);
      
    },
    
    getMaxDistanceX: function ( elementID ) {
      
      const element = document.querySelector( elementID );
      let elementWidth = element.getBoundingClientRect().width;
      this.maxDistanceX = elementWidth / 2;
      return this.maxDistanceX;
      
    },
    
    handleClickSticker: function () {
      
      this.isGhost = !this.isGhost;
      return;
      
    },
    
    handleHover: function (e) {
      
      this.isHovered = !this.isHovered;
      return;
      
    },
    
    changeTheme: function () {
      
      if ( !this.isGhost ) {
        
        const colorThemes = {
          
          mountains: ['#8c59ff', '#d4763d', '#8c59ff','#000'],
          faceLeft: ['#fff4e9', '#dccfbf', '#4bb8a7', '#e0a0a0'],
          faceRight: ['#fff4e9', '#dccfbf', '#4bb8a7', '#e0a0a0'],
          hands: ['#fff4e9', '#d6675c', '#6e2626', '#b9b3bb']
          
        };
        
        if ( this.colorIndex < colorThemes.mountains.length - 1 ) {
          
          this.colorIndex ++; 
          // FIXME later, ugly code :P
          console.log('color index: '+ this.colorIndex);
          document.querySelector('#mars-mountains').style.fill = colorThemes.mountains[this.colorIndex];
          document.querySelector('#face-left').style.fill = colorThemes.faceLeft[this.colorIndex];
          document.querySelector('#face-right').style.fill = colorThemes.faceRight[this.colorIndex];
          document.querySelector('#hand-left').style.fill = colorThemes.hands[this.colorIndex];
          document.querySelector('#hand-right').style.fill = colorThemes.hands[this.colorIndex];
          
        }  else  {
          
          this.colorIndex = 0;
          console.log('color index: '+ this.colorIndex);
          document.querySelector('#mars-mountains').style.fill = colorThemes.mountains[this.colorIndex];
          document.querySelector('#face-left').style.fill = colorThemes.faceLeft[this.colorIndex];
          document.querySelector('#face-right').style.fill = colorThemes.faceRight[this.colorIndex];
          document.querySelector('#hand-left').style.fill = colorThemes.hands[this.colorIndex];
          document.querySelector('#hand-right').style.fill = colorThemes.hands[this.colorIndex];
          
        }
        
        return;
        
      }  else  {
        
        console.log('Can\'t change themes when in ghost mode');
        return;
        
      }
      
    },
    
    loadEvents: function () {
      
      const ziggy = document.querySelector('#ziggy-main');
      const sticker = document.querySelector('#sticker');
      const planet = document.querySelector('#space-planet-overlay');
      
      window.addEventListener('resize', this.resizeCanvas, false);
      ziggy.addEventListener('touchmove', this.coordinates);
      ziggy.addEventListener('touchstart', this.coordinates);
      sticker.addEventListener('touchstart', this.handleClickSticker);
      planet.addEventListener('touchstart', this.changeTheme);
      
    }
    
  }
});