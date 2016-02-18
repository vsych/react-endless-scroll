var EndlessScroll, React, ReactDOM, topPosition;

React = require('react');

ReactDOM = require('react-dom');

topPosition = function(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
};

EndlessScroll = React.createClass({
  getDefaultProps: function() {
    return {
      pageStart: 0,
      hasMore: false,
      loadMore: function() {},
      threshold: 250
    };
  },
  componentDidMount: function() {
    this.pageLoaded = this.props.pageStart;
    return this.attachScrollListener();
  },
  componentDidUpdate: function() {
    return this.attachScrollListener();
  },
  render: function() {
    var props;
    props = this.props;
    return React.DOM.div(null, props.children, props.hasMore && props.loader);
  },
  scrollListener: function() {
    var el, scrollTop;
    el = ReactDOM.findDOMNode(this);
    scrollTop = window.pageYOffset !== void 0 ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      return this.props.loadMore(this.pageLoaded += 1);
    }
  },
  attachScrollListener: function() {
    if (!this.props.hasMore) {
      return;
    }
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    return this.scrollListener();
  },
  detachScrollListener: function() {
    window.removeEventListener('scroll', this.scrollListener);
    return window.removeEventListener('resize', this.scrollListener);
  },
  componentWillUnmount: function() {
    return this.detachScrollListener();
  }
});

module.exports = EndlessScroll;
