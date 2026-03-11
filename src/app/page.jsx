export default function HomePage() {
  return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px',fontFamily:'Onest, system-ui, sans-serif',background:'#f6f7fb',color:'#111827'}}>
      <div style={{maxWidth:'720px',width:'100%',background:'#fff',border:'1px solid #e5e7eb',borderRadius:'24px',padding:'40px',boxShadow:'0 10px 30px rgba(0,0,0,0.06)'}}>
        <div style={{fontSize:'14px',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#6b7280',marginBottom:'16px'}}>olga.kpstn.ru</div>
        <h1 style={{fontSize:'40px',lineHeight:1.1,margin:'0 0 16px'}}>Фронтенд-проект для Ольги готов к вёрстке</h1>
        <p style={{fontSize:'18px',lineHeight:1.6,margin:'0 0 12px',color:'#374151'}}>Здесь будет Next.js фронт. Как только пришлёшь макет, я разложу структуру блоков, данных и начну собирать экран за экраном.</p>
        <p style={{fontSize:'16px',lineHeight:1.6,margin:0,color:'#6b7280'}}>Текущий стенд нужен как техническая база: CI/CD, Docker image, деплой в Coolify и домен.</p>
      </div>
    </main>
  )
}
