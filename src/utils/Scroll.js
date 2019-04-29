export function getScrollBottomPercent(e) {
    let invisibleHeight = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight
    return (invisibleHeight - e.currentTarget.scrollTop) / invisibleHeight * 100
}

export function isTimeToLoadMore(e, threshold) {
    return getScrollBottomPercent(e) < threshold
}
