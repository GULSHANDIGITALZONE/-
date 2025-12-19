document.addEventListener('DOMContentLoaded', () => {
	const PAGE_SIZE = 10;

	document.querySelectorAll('.box').forEach(box => {
		const items = Array.from(box.querySelectorAll('.important-link-box'));
		if (!items || items.length <= PAGE_SIZE) return;

		// Initially show first PAGE_SIZE, hide the rest
		items.forEach((it, idx) => {
			if (idx >= PAGE_SIZE) it.style.display = 'none';
		});

		let shown = PAGE_SIZE;

		const btnMore = document.createElement('button');
		btnMore.textContent = 'और दिखाएँ';
		btnMore.className = 'show-more-btn';
		const btnLess = document.createElement('button');
		btnLess.textContent = 'कम दिखाएँ';
		btnLess.className = 'show-less-btn';

		// basic styles (kept inline to avoid touching CSS files)
		[btnMore, btnLess].forEach(b => {
			b.style.margin = '12px 6px 6px 0';
			b.style.padding = '8px 12px';
			b.style.border = 'none';
			b.style.background = '#0073e6';
			b.style.color = '#fff';
			b.style.borderRadius = '6px';
			b.style.cursor = 'pointer';
		});
		btnLess.style.display = 'none';

		btnMore.addEventListener('click', () => {
			const next = Math.min(shown + PAGE_SIZE, items.length);
			for (let i = shown; i < next; i++) items[i].style.display = '';
			shown = next;
			// show the 'less' button once we've shown more than initial
			if (shown > PAGE_SIZE) btnLess.style.display = '';
			// hide 'more' if everything is shown
			if (shown >= items.length) btnMore.style.display = 'none';
		});

		btnLess.addEventListener('click', () => {
			// hide last PAGE_SIZE items (step-wise) but never below PAGE_SIZE
			const hideTo = Math.max(PAGE_SIZE, shown - PAGE_SIZE);
			for (let i = hideTo; i < shown; i++) items[i].style.display = 'none';
			shown = hideTo;
			// hide less button if we're back to initial state
			if (shown <= PAGE_SIZE) btnLess.style.display = 'none';
			// ensure more button visible again
			if (shown < items.length) btnMore.style.display = '';
		});

		// append both buttons
		const ctrlWrap = document.createElement('div');
		ctrlWrap.style.marginTop = '8px';
		ctrlWrap.appendChild(btnMore);
		ctrlWrap.appendChild(btnLess);
		box.appendChild(ctrlWrap);
	});
});

// Optional: expose a function to reset/show-first-n for testing
function setupShowMore(pageSize = 10) {
	document.querySelectorAll('.box').forEach(box => {
		const items = Array.from(box.querySelectorAll('.important-link-box'));
		const btnMore = box.querySelector('.show-more-btn');
		const btnLess = box.querySelector('.show-less-btn');
		if (!items || items.length <= pageSize) {
			if (btnMore) btnMore.style.display = 'none';
			if (btnLess) btnLess.style.display = 'none';
			return;
		}
		items.forEach((it, idx) => it.style.display = idx < pageSize ? '' : 'none');
		if (btnMore) { btnMore.style.display = ''; btnMore.textContent = 'और दिखाएँ'; }
		if (btnLess) { btnLess.style.display = 'none'; btnLess.textContent = 'कम दिखाएँ'; }
	});
}


