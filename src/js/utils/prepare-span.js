function prepare(sel) {
    if (!sel.size()) return false;

    const html = sel
        .html()
        .split(' ')
        .map(d => `<span>${d}</span>`)
        .join(' ');

    sel.html(html);

    return true;
}

export default { prepare };
  