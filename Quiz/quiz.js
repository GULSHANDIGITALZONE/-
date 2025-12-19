(() => {
  const cfg = window.QUIZ || {};
  const QUESTIONS = cfg.QUESTIONS || [];

  const qText = document.getElementById('qText');
  const choices = document.getElementById('choices');
  const result = document.getElementById('result') || document.getElementById('score');
  const nextBtn = document.getElementById('nextBtn');

  if (!qText || !choices || !nextBtn) return;

  let idx = 0, score = 0, started = false;

  function renderQuestion(i){
    const item = QUESTIONS[i];
    qText.textContent = `Q${i+1}. ${item.q}`;
    choices.innerHTML = '';
    item.a.forEach((opt, j) => {
      const b = document.createElement('button');
      b.textContent = opt;
      b.className = 'quiz-choice';
      b.addEventListener('click', () => selectAnswer(j));
      choices.appendChild(b);
    });
    if (result) { result.textContent = ''; result.style.color = ''; }
    nextBtn.textContent = (QUESTIONS.length > 1) ? 'Next' : 'Finish';
  }

  function selectAnswer(choice){
    const correct = QUESTIONS[idx].correct;
    if (choice === correct){ score += 10; if(result) { result.textContent = 'सही! +10'; result.style.color='green'; } }
    else { if(result) { result.textContent = 'गलत। सही उत्तर: ' + QUESTIONS[idx].a[correct]; result.style.color='red'; } }
    Array.from(choices.children).forEach(b=>b.disabled=true);
    nextBtn.textContent = (idx < QUESTIONS.length-1) ? 'Next' : 'Finish';
  }

  nextBtn.addEventListener('click', ()=>{
    if (!started){
      started = true; idx = 0; score = 0; renderQuestion(idx); return;
    }

    const choiceButtons = Array.from(choices.children);
    if (choiceButtons.length && choiceButtons.every(b=>b.disabled)){
      idx++;
      if (idx >= QUESTIONS.length){
        qText.textContent = 'क्विज़ पूरा हुआ!';
        choices.innerHTML = '';
        if(result) result.textContent = 'आपका स्कोर: ' + score + ' / ' + (QUESTIONS.length*10);
        nextBtn.textContent = 'Restart';
        started = false;
      } else {
        renderQuestion(idx);
      }
    } else {
      if(result) result.textContent = 'कृपया उत्तर चुनें';
    }
  });

  // auto-start immediately so user doesn't need to click Start
  nextBtn.click();

  window.__quiz_shared = { renderQuestion, selectAnswer };
})();
