React = require 'react'
ReactDOM = require 'react-dom'

topPosition = (domElt) ->
  if !domElt
    return 0
  domElt.offsetTop + topPosition(domElt.offsetParent)

EndlessScroll = React.createClass

  getDefaultProps: ->
    pageStart: 0
    hasMore: false
    loadMore: ->
    threshold: 250

  componentDidMount: ->
    @pageLoaded = @props.pageStart
    @attachScrollListener()

  componentDidUpdate: ->
    @attachScrollListener()

  render: ->
    props = @props
    React.DOM.div null, props.children, props.hasMore and props.loader

  scrollListener: ->
    el = ReactDOM.findDOMNode this
    scrollTop = if window.pageYOffset != undefined then window.pageYOffset else (document.documentElement or document.body.parentNode or document.body).scrollTop
    if topPosition(el) + el.offsetHeight - scrollTop - (window.innerHeight) < Number(@props.threshold)
      @detachScrollListener()
      @props.loadMore @pageLoaded += 1

  attachScrollListener: ->
    if !@props.hasMore
      return
    window.addEventListener 'scroll', @scrollListener
    window.addEventListener 'resize', @scrollListener
    @scrollListener()

  detachScrollListener: ->
    window.removeEventListener 'scroll', @scrollListener
    window.removeEventListener 'resize', @scrollListener

  componentWillUnmount: ->
    @detachScrollListener()

module.exports = EndlessScroll
