<template>
  <div class="container">
    <h1 class="row skew-title">
      <span>S</span><span>K</span><span>E</span><span>W</span><span>E</span
      ><span class="last">D</span>
      &nbsp;
      <span>T</span><span>E</span><span>X</span><span class="last">T</span>
      &nbsp;
      <span class="alt">C</span><span class="alt">S</span
      ><span class="alt">S</span><span class="alt last">3</span>
    </h1>
    <p class="row row--intro">
      Add some depth to page titles with CSS3 'SkewY' transform and optional JS
      hover.
    </p>
  </div>
</template>

<script>
'.skew-title'.children('span').hover(
  function() {
    const $el = this
    const n = $el.index() + 1
    $el.addClass('flat')
    if (n % 2 === 0) {
      return $el.prev().addClass('flat')
    } else {
      if (!$el.hasClass('last')) {
        return $el.next().addClass('flat')
      }
    }
  },
  () => '.flat'.removeClass('flat')
)
export default {}
</script>

<style lang="scss" scoped>
body {
  margin-top: 180px;
  background-color: #112;
  background-color: #0c2d41;
  font-family: Roboto, 'helvetica neue', Helvetica, Arial, sans-serif;
}

.container {
  width: 800px;
  margin: auto;
}

.row {
  position: relative;
  height: 50px;
  z-index: 1;
  clear: both;
  margin-bottom: 30px;
  text-align: center;
}

.row--intro {
  padding-top: 20px;
  font-size: 16px;
  line-height: 28px;
  font-weight: 300;
  color: #fff;
  opacity: 0.4;
}

.row--intro span {
  font-size: 11px;
}

.skew-title {
  font-size: 25px;
}

.skew-title span {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 50px;
  margin: auto;
  z-index: 2;
  text-align: center;
  color: #fff;
  font-family: 'roboto condensed';
  font-weight: 700;
  font-size: 35.714285714285715px;
  line-height: 50px;
  transform: skewY(-15deg);
  transform-origin: 0 100%;
  transition: all 0.2s;
  cursor: default;
}

.skew-title span:after,
.skew-title span:before {
  display: block;
  top: 0;
  left: 0;
  width: 40px;
  height: 50px;
  position: absolute;
  background: #185a81;
  content: ' ';
  z-index: -1;
  transition: all 0.2s;
}

.skew-title span:before {
  background: rgba(0, 0, 0, 0.1);
  transform: skewY(15deg);
  transform-origin: 0 0;
}

.skew-title span:nth-child(even) {
  background-color: #144c6e;
  transform: skewY(15deg);
  transform-origin: 100% 100%;
  color: #d9d9d9;
}

.skew-title span:nth-child(even):after {
  background-color: #144c6e;
}

.skew-title span:nth-child(even):before {
  transform-origin: 100% 0;
  transform: skewY(-15deg);
}

.skew-title span.flat {
  transform: skewY(0);
  color: #fff;
}

.skew-title span.flat:before {
  transform: skewY(0);
}

.skew-title span.flat:nth-child(even):after {
  background-color: #185a81;
}

.skew-title span.alt:after {
  background-color: #b94a2c;
}

.skew-title span.alt:nth-child(even):after {
  background-color: #9d3f25;
}

.skew-title span.alt.flat:nth-child(even):after {
  background-color: #b94a2c;
}
</style>
