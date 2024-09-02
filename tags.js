window.addEventListener('hashchange', function() {
    scrollToHash();
});

function scrollToHash() {
    const hash = window.location.hash;
    if (hash && isValidSelector(hash)) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// 检查是否是有效的选择器
function isValidSelector(selector) {
    try {
        document.querySelector(selector);
    } catch (e) {
        return false;
    }
    return true;
}

// 页面加载时滚动到hash对应的div
document.addEventListener('DOMContentLoaded', function() {
    scrollToHash();
});

// 使用Intersection Observer API来检测div何时出现在视口中
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from(Array(101).keys(), x => x / 100) // 生成0到1之间的101个阈值
};

const observerCallback = (entries) => {
    let maxRatio = 0;
    let maxEntry = null;

    entries.forEach(entry => {
        if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxEntry = entry;
        }
    });

    if (maxEntry) {
        // 仅在页面初始加载时使用hash来跳转
        const hash = window.location.hash;
        if (!hash) {
            const id = maxEntry.target.id;
            window.history.replaceState(null, null, `#${id}`);
        }
    }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.content').forEach(div => {
    observer.observe(div);
});
