function prepare(sel) {
    if (!sel.size()) return false;

    console.log({ sel });

    const html = sel
        .html()
        .split(' ' || '<br>')
        .map((d, i) => `<span data-index=${i}>${d}</span>`)
        .join(' ');

    sel.html(html);

    return true;
}

export default { prepare };
