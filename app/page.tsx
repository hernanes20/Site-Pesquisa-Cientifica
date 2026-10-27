'use client'

import { useState } from 'react'
import {
  ArrowDown, ArrowRight, BookOpen, Check, CircleAlert, ExternalLink,
  Gavel, GraduationCap, Menu, Network, Scale, ShieldCheck, Sparkles, X, Zap,
} from 'lucide-react'

const gold = '#E7B45A'

const stages = [
  { n: '01', title: 'Escolha do tema', text: 'Investigamos o uso da IA generativa na elaboração de decisões judiciais, com foco nos riscos de referências jurídicas falsas e no dever de verificação.' },
  { n: '02', title: 'Revisão de literatura', text: 'A literatura revela alucinações jurídicas, limites da automação e a importância das normas do CNJ para orientar o uso responsável da tecnologia.' },
  { n: '03', title: 'Justificativa', text: 'O estudo é relevante para a segurança jurídica, para a formação acadêmica e para a legitimidade institucional do Poder Judiciário.' },
  { n: '04', title: 'Formulação do problema', text: 'Em que medida a utilização da IA generativa na elaboração de decisões pode comprometer a segurança jurídica diante do risco de referências falsas?' },
  { n: '05', title: 'Determinação dos objetivos', text: 'Compreender riscos, analisar deveres de supervisão e propor uma cultura de verificação humana antes da incorporação de qualquer conteúdo.' },
]

const laws = [
  { icon: Scale, label: 'Constituição Federal', ref: 'Art. 93, IX', text: 'As decisões judiciais devem ser fundamentadas, sob pena de nulidade. No contexto da inteligência artificial, essa exigência reforça o dever do magistrado de verificar as informações utilizadas e fundamentar juridicamente suas decisões.', href: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm' },
  { icon: Gavel, label: 'Código de Processo Civil', ref: 'Art. 489', text: 'O artigo trata dos elementos essenciais da sentença e da fundamentação das decisões judiciais. Uma resposta plausível, por si só, não substitui a fundamentação jurídica.', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm' },
  { icon: BookOpen, label: 'Código de Processo Civil', ref: 'Art. 10', text: 'Veda decisões baseadas em fundamento sobre o qual as partes não tiveram oportunidade de se manifestar. Supervisão também é contraditório.', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm' },
  { icon: ShieldCheck, label: 'Resolução CNJ nº 615/2025', ref: 'e Res. nº 674/2026', text: 'Estabelece diretrizes para o desenvolvimento, uso e governança de soluções de inteligência artificial no Poder Judiciário.', href: 'https://atos.cnj.jus.br/atos/detalhar/6001' },
]

const scenarios = [
  { tag: 'CENÁRIO 01', title: 'A súmula que parece existir', source: 'A IA afirma: “Conforme a Súmula 789 do STF, é permitido dispensar a fundamentação quando a matéria for pacífica.”', verdict: 'Referência inexistente', good: 'Verificar as fontes', feedback: 'A Súmula 789 do STF não existe. A conduta adequada é interromper o uso da resposta e consultar a fonte oficial. A aparência técnica não valida uma citação.', points: 1 },
  { tag: 'CENÁRIO 02', title: 'A lei verdadeira, no lugar errado', source: 'A IA cita o art. 10 do CPC, mas conclui que o juiz pode decidir com base em fundamento novo sem ouvir as partes.', verdict: 'Interpretação incorreta', good: 'Rejeitar a fundamentação', feedback: 'O dispositivo é verdadeiro, mas a conclusão contradiz seu sentido. Fontes reais também podem ser usadas de modo errado: é preciso ler o texto e confrontá-lo com o caso.', points: 1 },
  { tag: 'CENÁRIO 03', title: 'Fundamentação verificável', source: 'A IA indica o art. 93, IX, da Constituição, transcreve o dispositivo e apresenta o link oficial para conferência.', verdict: 'Fonte verificável', good: 'Verificar as fontes', feedback: 'Mesmo quando a fonte parece correta, o magistrado deve conferir o texto original, o contexto e a pertinência. A IA auxilia; a decisão continua sendo humana.', points: 1 },
]

const quiz = [
  ['O que é uma alucinação jurídica?', ['Uma decisão automatizada', 'Uma informação jurídica inventada apresentada como verdadeira', 'Uma lei antiga', 'Um erro de digitação'], 1, 'É quando o sistema gera conteúdo falso ou inexistente com linguagem convincente.'],
  ['Qual é a postura adequada diante de uma citação da IA?', ['Aceitar se parecer técnica', 'Verificar em fonte oficial', 'Excluir todas as citações', 'Perguntar à própria IA'], 1, 'A verificação deve ocorrer em fontes oficiais e confiáveis, não apenas por nova consulta ao modelo.'],
  ['O art. 93, IX, da Constituição trata de:', ['Contraditório', 'Publicidade e fundamentação das decisões', 'Proteção de dados', 'Competência territorial'], 1, 'O dispositivo exige que as decisões sejam fundamentadas, sob pena de nulidade.'],
  ['A supervisão humana significa:', ['Proibir toda tecnologia', 'Delegar a decisão à IA', 'Revisar criticamente a saída antes de utilizá-la', 'Confiar no treinamento'], 2, 'Supervisão é análise crítica, contextual e responsável do conteúdo produzido.'],
  ['Uma resposta convincente é necessariamente verdadeira?', ['Sim', 'Somente em decisões', 'Não', 'Somente se tiver números'], 2, 'Fluência não é prova de veracidade.'],
  ['Qual fonte deve ser priorizada?', ['Post em rede social', 'Fonte oficial do tribunal ou legislação', 'Resposta de chatbot', 'Comentário anônimo'], 1, 'Fontes oficiais permitem consultar o texto autêntico e seu contexto.'],
  ['O art. 489 do CPC se relaciona principalmente à:', ['Fundamentação da sentença', 'Criação de leis', 'Organização administrativa', 'Perícia técnica'], 0, 'O artigo lista elementos e hipóteses ligados à fundamentação das decisões.'],
  ['O magistrado pode transferir sua responsabilidade para a IA?', ['Sim', 'Não', 'Somente em casos simples', 'Somente com autorização'], 1, 'A ferramenta pode apoiar, mas não substitui o dever constitucional de julgar e fundamentar.'],
  ['O que caracteriza segurança jurídica?', ['Surpresa', 'Previsibilidade e confiança nas decisões', 'Velocidade', 'Automação total'], 1, 'A segurança jurídica depende de decisões justificadas, coerentes e verificáveis.'],
  ['O objetivo desta pesquisa é:', ['Provar que toda IA é ruim', 'Defender decisões automáticas', 'Analisar riscos e deveres de verificação', 'Criar um tribunal digital'], 2, 'O foco é compreender riscos e reforçar o papel da verificação humana.'],
]

const detectorClaims = [
  { text: 'Art. 93, IX, exige fundamentação', isIncorrect: false, reason: 'Correto: a Constituição Federal exige que as decisões judiciais sejam fundamentadas.' },
  { text: 'IA pode substituir a análise do magistrado', isIncorrect: true, reason: 'Incorreto: a IA pode auxiliar, mas não substitui a análise e a responsabilidade do magistrado.' },
  { text: 'Súmula 9999 do STJ', isIncorrect: true, reason: 'Incorreto: a referência a essa súmula foi inventada para este exercício; não a trate como fonte jurídica real.' },
  { text: 'Consultar fontes oficiais', isIncorrect: false, reason: 'Correto: conferir referências em fontes oficiais é uma prática adequada.' },
]

export default function Page() {
  const [menu, setMenu] = useState(false)
  const [stage, setStage] = useState(0)
  const [scenario, setScenario] = useState(0)
  const [scenarioDone, setScenarioDone] = useState<number[]>([])
  const [scenarioAnswer, setScenarioAnswer] = useState<string | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null)
  const [selectedLaw, setSelectedLaw] = useState(0)
  const [detector, setDetector] = useState<number[]>([])
  const [detectorChecked, setDetectorChecked] = useState(false)

  function answerScenario(option: string) {
    if (scenarioAnswer !== null) return
    if (!scenarioDone.includes(scenario)) setScenarioDone([...scenarioDone, scenario])
    setScenarioAnswer(option)
  }
  function nextScenario() {
    setScenario(scenario + 1)
    setScenarioAnswer(null)
  }
  function restartSimulator() { setScenario(0); setScenarioDone([]); setScenarioAnswer(null) }
  function answerQuiz(i: number) {
    if (quizAnswered !== null) return
    setQuizAnswered(i)
    if (i === quiz[quizIndex][2]) setQuizScore((score) => score + 1)
  }
  function nextQuiz() { setQuizAnswered(null); setQuizIndex(quizIndex + 1) }
  function restartQuiz() { setQuizIndex(0); setQuizScore(0); setQuizAnswered(null) }
  function quizMessage(score: number) {
    if (score >= 9) return 'Excelente! Você demonstrou domínio da verificação e do senso crítico jurídico.'
    if (score >= 7) return 'Muito bom! Você reconhece os principais riscos, mas ainda pode conferir cada fonte com mais atenção.'
    if (score >= 5) return 'Bom começo. Revise as fontes oficiais e tente novamente para consolidar o aprendizado.'
    return 'Continue estudando. A prática de questionar e verificar é essencial antes de confiar em qualquer resposta da IA.'
  }
  function quizMood(score: number) {
    if (score >= 9) return { title: 'Excelente resultado!', text: 'Você demonstrou ótimo domínio do tema e sabe a importância de verificar as informações jurídicas.', symbol: '☺', tone: 'text-green-200', badge: 'border-green-300/50 bg-green-400/10 text-green-200' }
    if (score >= 7) return { title: 'Bom resultado!', text: 'Você compreendeu os principais pontos. Continue conferindo as informações em fontes oficiais.', symbol: '☺', tone: 'text-green-200', badge: 'border-green-300/50 bg-green-400/10 text-green-200' }
    if (score >= 5) return { title: 'Resultado regular', text: 'Você já compreendeu parte do conteúdo, mas vale revisar alguns pontos e tentar novamente.', symbol: '•', tone: 'text-amber-200', badge: 'border-amber-300/50 bg-amber-400/10 text-amber-200' }
    return { title: 'Precisa melhorar', text: 'Revise o conteúdo e tente novamente. Verificar informações em fontes oficiais é essencial.', symbol: '☹', tone: 'text-red-200', badge: 'border-red-300/50 bg-red-400/10 text-red-200' }
  }

  const detectorCorrectCount = detectorClaims.filter((claim, i) => detector.includes(i) === claim.isIncorrect).length

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B1F2A] text-[#F5F1E8]">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B1F2A]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="IA sob julgamento - início">
            <img src="/images/fam-logo.png" alt="FAM — Faculdade Regional do Amazonas" className="h-12 w-auto object-contain" />
            <span className="hidden text-sm font-semibold tracking-[0.18em] text-white sm:block">IA SOB <span className="text-[#E7B45A]">JULGAMENTO</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.16em] text-white/60 md:flex">
            <a href="#pesquisa" className="transition hover:text-[#E7B45A]">Pesquisa</a><a href="#simulador" className="transition hover:text-[#E7B45A]">Simulador</a><a href="#legislacao" className="transition hover:text-[#E7B45A]">Legislação</a><a href="#quiz" className="transition hover:text-[#E7B45A]">Quiz</a><a href="#equipe" className="transition hover:text-[#E7B45A]">Equipe</a>
          </nav>
          <button className="text-white md:hidden" onClick={() => setMenu(!menu)} aria-label="Abrir menu"><Menu /></button>
        </div>
        {menu && <nav className="flex flex-col gap-5 border-t border-white/10 bg-[#0B1F2A] px-6 py-6 text-sm uppercase tracking-widest md:hidden"><a href="#pesquisa" onClick={() => setMenu(false)}>Pesquisa</a><a href="#simulador" onClick={() => setMenu(false)}>Simulador</a><a href="#legislacao" onClick={() => setMenu(false)}>Legislação</a><a href="#quiz" onClick={() => setMenu(false)}>Quiz</a></nav>}
      </header>

      <section id="inicio" className="relative flex min-h-screen items-center border-b border-white/10 pt-20">
        <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle at 18% 30%, rgba(231,180,90,.22) 0 1px, transparent 1px), linear-gradient(120deg, transparent 35%, rgba(231,180,90,.12) 35.1%, transparent 35.3%), linear-gradient(30deg, transparent 55%, rgba(255,255,255,.06) 55.1%, transparent 55.3%)', backgroundSize: '54px 54px, 240px 240px, 180px 180px' }} />
        <div className="absolute -right-24 top-1/4 size-96 rounded-full bg-[#E7B45A]/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#E7B45A]"><span className="h-px w-10 bg-[#E7B45A]" /> Pesquisa científica · Direito · 2026</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[.98] tracking-[-.03em] text-white sm:text-7xl lg:text-[6.6rem]">E SE A IA <em className="text-[#E7B45A]">INVENTASSE</em> UMA LEI?</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">A inteligência artificial pode auxiliar magistrados, mas também produzir jurisprudências inexistentes, referências falsas e informações aparentemente verdadeiras. <strong className="font-medium text-white">Quem verifica aquilo que a máquina afirma?</strong></p>
            <div className="mt-10 flex flex-wrap gap-4"><a href="#pesquisa" className="inline-flex items-center gap-3 rounded-full bg-[#E7B45A] px-6 py-3.5 text-sm font-bold text-[#0B1F2A] transition hover:bg-[#f5cc7e]">Explorar a pesquisa <ArrowRight /></a><a href="#quiz" className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#E7B45A] hover:text-[#E7B45A]">Testar seus conhecimentos <Zap /></a></div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true"><div className="absolute inset-8 rounded-full border border-[#E7B45A]/25" /><div className="absolute inset-20 rounded-full border border-[#E7B45A]/30" /><div className="absolute inset-28 grid place-items-center rounded-full bg-[#E7B45A]/10 text-[#E7B45A] shadow-[0_0_100px_rgba(231,180,90,.15)]"><Scale className="size-24" strokeWidth={1} /></div>{[0,1,2,3,4,5].map(i => <span key={i} className="absolute size-2 animate-pulse rounded-full bg-[#E7B45A]" style={{ left: `${12 + (i * 19) % 76}%`, top: `${10 + (i * 31) % 78}%`, animationDelay: `${i * 350}ms` }} />)}</div>
        </div><a href="#pesquisa" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#E7B45A]" aria-label="Rolar para pesquisa"><ArrowDown className="animate-bounce" /></a>
      </section>

      <section id="pesquisa" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 lg:px-8"><div className="mb-16 max-w-3xl"><p className="eyebrow">01 / A investigação</p><h2 className="section-title">Nossa pesquisa <span>científica.</span></h2><p className="mt-5 text-lg leading-8 text-white/60">O uso da inteligência artificial generativa na elaboração de decisões judiciais: riscos de referências jurídicas falsas e dever de verificação pelo magistrado.</p></div><div className="grid gap-10 lg:grid-cols-[280px_1fr]"><div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0">{stages.map((s, i) => <button key={s.n} onClick={() => setStage(i)} className={`group flex min-w-max items-center gap-4 border-l px-4 py-4 text-left transition lg:min-w-0 ${stage === i ? 'border-[#E7B45A] text-[#E7B45A]' : 'border-white/15 text-white/40 hover:text-white/75'}`}><span className="font-mono text-xs">{s.n}</span><span className="text-sm font-semibold">{s.title}</span></button>)}</div><div className="glass min-h-72 p-8 lg:p-12"><span className="font-mono text-sm text-[#E7B45A]">ETAPA {stages[stage].n}</span><h3 className="mt-5 font-serif text-4xl text-white">{stages[stage].title}</h3><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{stages[stage].text}</p><div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-widest text-white/40"><span className="rounded-full border border-white/10 px-3 py-2">Hipótese</span><span className="rounded-full border border-white/10 px-3 py-2">Metodologia qualitativa</span><span className="rounded-full border border-white/10 px-3 py-2">Fontes oficiais</span></div></div></div></section>

      <section id="simulador" className="scroll-mt-20 border-y border-white/10 bg-[#102D3A] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow">02 / Experiência educacional</p><h2 className="section-title">Você é o <span>magistrado.</span></h2></div>
            <p className="max-w-sm text-sm leading-6 text-white/50">Simulação educacional. Os cenários são fictícios e não representam casos reais ou decisões de tribunais.</p>
          </div>
          <div className="glass mx-auto max-w-4xl p-6 sm:p-10">
            <div className="mb-10 flex items-center justify-between">
              <div><span className="font-mono text-xs text-[#E7B45A]">{scenarios[scenario].tag}</span><div className="mt-3 flex gap-1">{scenarios.map((_, i) => <span key={i} className={`h-1 w-14 rounded-full ${i <= scenario ? 'bg-[#E7B45A]' : 'bg-white/15'}`} />)}</div></div>
              <div className="flex items-center gap-4"><span className="text-sm text-white/50">Progresso: <strong className="text-[#E7B45A]">{scenarioDone.length}/3</strong></span>{scenarioDone.length === scenarios.length && <button onClick={restartSimulator} className="text-xs font-semibold text-[#E7B45A] hover:underline">Refazer simulação</button>}</div>
            </div>
            <h3 className="font-serif text-3xl text-white sm:text-4xl">{scenarios[scenario].title}</h3>
            <div className="my-8 rounded-xl border border-white/10 bg-[#0B1F2A]/70 p-6 font-serif text-lg leading-8 text-white/80">“{scenarios[scenario].source}”</div>
            <p className="mb-5 text-xs uppercase tracking-widest text-white/40">Como você decide?</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Confiar na resposta', 'Verificar as fontes', 'Rejeitar a fundamentação'].map(option => (
                <button key={option} onClick={() => answerScenario(option)} disabled={scenarioAnswer !== null} aria-pressed={scenarioAnswer === option} className={`rounded-lg border px-4 py-3 text-sm transition disabled:cursor-default ${scenarioAnswer === option ? option === scenarios[scenario].good ? 'border-green-300 bg-green-400/10 text-green-200' : 'border-red-300 bg-red-400/10 text-red-200' : 'border-white/15 text-white/75 hover:border-[#E7B45A] hover:bg-[#E7B45A]/10 hover:text-[#E7B45A]'}`}>{option}</button>
              ))}
            </div>
            {scenarioAnswer !== null && (
              <div aria-live="polite" className={`mt-8 rounded-lg border p-5 text-sm leading-6 ${scenarioAnswer === scenarios[scenario].good ? 'border-green-300/30 bg-green-400/10 text-green-100' : 'border-amber-300/30 bg-amber-400/10 text-amber-100'}`}>
                <p className="font-semibold">{scenarioAnswer === scenarios[scenario].good ? 'Você acertou!' : 'Essa não é a melhor decisão.'} Sua escolha: {scenarioAnswer}.</p>
                <p className="mt-2">{scenarios[scenario].feedback}</p>
                <p className="mt-2"><span className="font-semibold">Resposta esperada:</span> {scenarios[scenario].good}.</p>
                {scenario < scenarios.length - 1
                  ? <button onClick={nextScenario} className="mt-4 inline-flex items-center gap-2 font-semibold text-[#E7B45A]">Próximo cenário <ArrowRight /></button>
                  : <div className="mt-4"><p className="font-semibold">Simulação concluída — você respondeu aos três cenários.</p><button onClick={restartSimulator} className="mt-3 font-semibold text-[#E7B45A] hover:underline">Refazer simulação</button></div>}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="detector" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow">03 / Detector de alucinações</p><h2 className="section-title">Nem tudo que <span>parece jurídico</span> é real.</h2><p className="mt-6 leading-7 text-white/60">Marque os trechos incorretos. Há afirmações corretas e incorretas.</p><div className="mt-8 border-l-2 border-[#E7B45A] pl-5 text-lg italic leading-7 text-white/80">“Uma resposta convincente não é necessariamente uma resposta verdadeira.”</div></div><div className="glass p-6 sm:p-8"><p className="mb-6 text-sm leading-6 text-white/60">“A Constituição Federal, no art. 93, IX, exige que as decisões judiciais sejam fundamentadas. A inteligência artificial pode substituir a análise do magistrado quando citar a Súmula 9999 do STJ. Antes de usar referências jurídicas, consulte fontes oficiais.”</p><div className="flex flex-wrap gap-3">{detectorClaims.map(({ text }, i) => <button key={text} onClick={() => { setDetector(detector.includes(i) ? detector.filter(x => x !== i) : [...detector, i]); setDetectorChecked(false) }} aria-pressed={detector.includes(i)} className={`rounded-full border px-4 py-2 text-sm transition ${detector.includes(i) ? 'border-red-300 bg-red-400/10 text-red-200' : 'border-white/15 text-white/60 hover:border-[#E7B45A]'}`}>{detector.includes(i) ? <X className="mr-1 inline size-3" /> : null}{text}</button>)}</div><button onClick={() => setDetectorChecked(true)} disabled={detector.length === 0} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0B1F2A] disabled:cursor-not-allowed disabled:opacity-50">Confirmar análise <Check /></button>{detectorChecked && <div aria-live="polite" className="mt-5 rounded-lg border border-[#E7B45A]/30 bg-[#E7B45A]/10 p-4 text-sm leading-6 text-[#F5F1E8]"><p className="font-semibold">{detectorCorrectCount === detectorClaims.length ? 'Muito bem! Você marcou os dois trechos incorretos e deixou as afirmações corretas sem marcar.' : `Você classificou corretamente ${detectorCorrectCount} de ${detectorClaims.length} trechos. Confira abaixo quais seleções acertou.`}</p><ul className="mt-3 grid gap-2">{detectorClaims.map((claim, i) => { const selected = detector.includes(i); const correctSelection = selected === claim.isIncorrect; return <li key={claim.text}><span className={`font-semibold ${correctSelection ? 'text-green-200' : 'text-red-200'}`}>{selected ? (claim.isIncorrect ? 'Certo, incorreto marcado' : 'Ops, esse trecho está correto') : (claim.isIncorrect ? 'Faltou marcar' : 'Certo, deixado sem marcar')} — “{claim.text}”:</span> {claim.reason}</li> })}</ul></div>}</div></div></section>

      <section id="legislacao" className="scroll-mt-20 border-y border-white/10 bg-[#102D3A] px-5 py-28 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-12"><p className="eyebrow">04 / Marco normativo</p><h2 className="section-title">O que diz a <span>legislação?</span></h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{laws.map((law, i) => { const Icon = law.icon; return <button key={law.ref} onClick={() => setSelectedLaw(i)} className={`glass p-6 text-left transition hover:-translate-y-1 ${selectedLaw === i ? 'border-[#E7B45A]/60' : ''}`}><Icon className="text-[#E7B45A]" /><p className="mt-8 text-sm font-semibold text-white">{law.label}</p><p className="mt-2 font-mono text-xs text-[#E7B45A]">{law.ref}</p></button> })}</div><div className="mt-6 glass flex flex-col justify-between gap-6 p-7 md:flex-row md:items-center"><div><h3 className="text-xl font-semibold text-white">{laws[selectedLaw].label} <span className="font-mono text-sm text-[#E7B45A]">· {laws[selectedLaw].ref}</span></h3><p className="mt-3 max-w-3xl leading-7 text-white/60">{laws[selectedLaw].text}</p><p className="mt-2 text-xs text-white/40">Síntese explicativa — não é uma transcrição literal da lei.{selectedLaw === 1 && ' No CPC, consulte também o § 1º, IV, do art. 489.'}</p></div><a href={laws[selectedLaw].href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#E7B45A]">Abrir fonte oficial · buscar {laws[selectedLaw].ref} <ExternalLink /></a></div></div></section>

      <section id="quiz" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">05 / Quiz de verificação</p>
            <h2 className="section-title">Teste seu <span>julgamento.</span></h2>
          </div>
          <div className="glass p-6 sm:p-10">
            {quizIndex < quiz.length ? (
              <>
                <div className="mb-8 flex justify-between text-xs text-white/50">
                  <span>QUESTÃO {quizIndex + 1} DE {quiz.length}</span>
                  <span>{quizScore} acertos</span>
                </div>
                <div className="mb-8 h-1 rounded-full bg-white/10">
                  <div className="h-1 rounded-full bg-[#E7B45A] transition-all" style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }} />
                </div>
                <h3 className="text-2xl font-semibold leading-8 text-white">{quiz[quizIndex][0]}</h3>
                <div className="mt-7 grid gap-3">
                  {(quiz[quizIndex][1] as string[]).map((option, i) => (
                    <button
                      key={option}
                      onClick={() => answerQuiz(i)}
                      className={`rounded-lg border p-4 text-left text-sm transition ${quizAnswered === i ? i === quiz[quizIndex][2] ? 'border-green-300 bg-green-400/10 text-green-200' : 'border-red-300 bg-red-400/10 text-red-200' : 'border-white/15 text-white/70 hover:border-[#E7B45A]'}`}
                    >
                      {String.fromCharCode(65 + i)}. {option}
                    </button>
                  ))}
                </div>
                {quizAnswered !== null && (
                  <div className="mt-6 flex items-start gap-3 rounded-lg bg-white/5 p-4 text-sm leading-6 text-white/65">
                    <Sparkles className="mt-1 shrink-0 text-[#E7B45A]" />
                    {quiz[quizIndex][3]}
                    <button onClick={nextQuiz} className="ml-auto shrink-0 text-[#E7B45A]">
                      {quizIndex < quiz.length - 1 ? 'Próxima' : 'Ver resultado'} <ArrowRight className="inline" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-10 text-center">
                <div className={`mx-auto grid size-20 place-items-center rounded-full border text-5xl ${quizMood(quizScore).badge}`} aria-label={quizMood(quizScore).title}>
                  {quizMood(quizScore).symbol}
                </div>
                <GraduationCap className="mx-auto mt-6 size-14 text-[#E7B45A]" />
                <h3 className="mt-5 font-serif text-4xl text-white">Resultado: {quizScore}/10</h3>
                <h4 className={`mt-4 text-xl font-semibold ${quizMood(quizScore).tone}`}>{quizMood(quizScore).title}</h4>
                <p className="mx-auto mt-3 max-w-md text-white/65">{quizMood(quizScore).text}</p>
                <div className="mx-auto mt-6 max-w-md rounded-xl border border-[#E7B45A]/30 bg-[#E7B45A]/10 p-5 text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E7B45A]">Seu desempenho</p>
                  <p className="mt-2 text-lg font-semibold text-white">{quizMessage(quizScore)}</p>
                </div>
                <p className="mt-5 text-white/60">Você pode revisar o conteúdo e responder novamente quantas vezes quiser.</p>
                <button onClick={restartQuiz} className="mt-8 rounded-lg border border-[#E7B45A] px-5 py-3 text-sm font-semibold text-[#E7B45A]">Reiniciar quiz</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="referencias" className="border-t border-white/10 px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">06 / Base teórica</p><h2 className="section-title">Referências <span>científicas.</span></h2></div><ul className="divide-y divide-white/10">{['Conselho Nacional de Justiça — Resolução nº 615/2025', 'Dahl, Magesh, Suzgun e Ho — Large Legal Fictions (2024)', 'Toledo e Pessoa — O uso de inteligência artificial na tomada de decisão judicial (2023)', 'Roque e Santos — Inteligência artificial na tomada de decisões judiciais: três premissas básicas (2021)', 'Constituição Federal de 1988 e Código de Processo Civil de 2015'].map((reference) => <li key={reference} className="py-5 text-sm text-white/70">{reference}</li>)}</ul></div></div></section>

      <footer id="equipe" className="border-t border-white/10 bg-[#071820] px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 md:grid-cols-3"><div><img src="/images/fam-logo.png" alt="FAM — Faculdade do Amazonas" className="h-16 w-auto object-contain" /><div className="mt-5 flex items-center gap-3 text-[#E7B45A]"><Scale /><span className="font-semibold tracking-widest">IA SOB JULGAMENTO</span></div><p className="mt-5 max-w-sm text-sm leading-6 text-white/45">Uma apresentação acadêmica interativa sobre tecnologia, justiça e responsabilidade.</p></div><div><p className="text-xs uppercase tracking-widest text-white/40">Equipe de pesquisa</p><ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">{['Safira Brito', 'Sarah Lobo', 'Miguel Vilhena', 'Davi Hernanes', 'Cristiane Lima', 'Ingrid Mota'].map((name) => <li key={name} className="rounded-lg border border-dashed border-white/15 p-3 text-sm text-white/65">{name}</li>)}</ul></div><div><p className="text-xs uppercase tracking-widest text-white/40">Contexto acadêmico</p><p className="mt-5 text-sm leading-7 text-white/60"><span className="text-white/40">Instituição</span><br />FAM — Faculdade do Amazonas<br /><span className="text-white/40">Disciplina</span><br />Metodologia Científica<br /><span className="text-white/40">Professora</span><br />Maria de Lourdes do Nascimento Dantas<br />Primeiro período · 2026</p></div></div><div className="mt-20 border-t border-white/10 pt-8"><p className="max-w-3xl font-serif text-2xl leading-9 text-white/80">“A inteligência artificial pode auxiliar na construção de uma decisão. Mas a responsabilidade de verificar, fundamentar e julgar permanece humana.”</p><p className="mt-6 text-xs text-white/35">© 2026 · Pesquisa acadêmica · Todos os cenários interativos são educacionais.</p></div></div></footer>
    </main>
  )
}
