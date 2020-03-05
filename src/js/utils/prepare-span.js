function prepare(sel) {
    if (!sel.size()) return false;

    const html = sel
        .html()
        .split(' ')
        .map((d, i) => `<span data-index=${i}>${d}</span>`)
        .join(' ');

    sel.html(html);

    return true;
}

export default { prepare };
