'use server'
// import { getCloudflareContext } from '@opennextjs/cloudflare'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'

/**
 * Incrementa o contador e registra o acesso
 *
 * Instruções para conexão com banco de dados:
 * 1. Descomente a linha import { getCloudflareContext }
 * 2. Descomente a linha const cf = await getCloudflareContext()
 * 3. Descomente o código de operações no banco de dados
 * 4. Certifique-se de que o binding do banco D1 esteja configurado no wrangler.toml
 * 5. Tabelas necessárias:
 *    - tabela counters: name(TEXT), value(INTEGER)
 *    - tabela access_logs: ip(TEXT), path(TEXT), accessed_at(DATETIME)
 */
export async function incrementarERegistrar() {
  // const cf = await getCloudflareContext()
  const cabecalhos = headers()
  const armazenadorCookies = await cookies()
  let contadorAtual = parseInt(armazenadorCookies.get('page_views')?.value || '0')

  contadorAtual += 1

  armazenadorCookies.set('page_views', contadorAtual.toString(), {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    path: '/'
  })

  const horarioAcesso = new Date().toISOString()
  const listaAcessosRecentes = JSON.parse(armazenadorCookies.get('recent_access')?.value || '[]')
  listaAcessosRecentes.unshift({ accessed_at: horarioAcesso })

  while (listaAcessosRecentes.length > 5) {
    listaAcessosRecentes.pop()
  }

  armazenadorCookies.set('recent_access', JSON.stringify(listaAcessosRecentes), {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: '/'
  })

  // Exemplo de operação com banco de dados (comentado):
  // const { results: resultadosContador } = await cf.env.DB.prepare(
  //   'INSERT INTO counters (name, value) VALUES (?, 1) ON CONFLICT (name) DO UPDATE SET value = value + 1 RETURNING value'
  // )
  //   .bind('page_views')
  //   .all()

  // await cf.env.DB.prepare('INSERT INTO access_logs (ip, path, accessed_at) VALUES (?, ?, datetime())')
  //   .bind(
  //     cabecalhos.get('x-forwarded-for') || cabecalhos.get('x-real-ip') || 'unknown',
  //     cabecalhos.get('x-forwarded-host') || '/'
  //   )
  //   .run()

  // const { results: registros } = await cf.env.DB.prepare('SELECT * FROM access_logs ORDER BY accessed_at DESC LIMIT 5').all()

  return {
    count: contadorAtual,
    recentAccess: listaAcessosRecentes
  }
}

/**
 * Obtém o valor atual do contador e os registros recentes de acesso
 *
 * Instruções para consulta ao banco de dados:
 * 1. Ao usar o banco de dados, obtenha o contexto Cloudflare com getCloudflareContext()
 * 2. Use cf.env.DB.prepare para executar consultas SQL
 * 3. Para desenvolvimento local, utilize o wrangler para simular o banco
 */
export async function obterEstatisticas() {
  const armazenadorCookies = await cookies()
  const contadorAtual = parseInt(armazenadorCookies.get('page_views')?.value || '0')
  const listaAcessosRecentes = JSON.parse(armazenadorCookies.get('recent_access')?.value || '[]')

  // Exemplo de consulta ao banco de dados (comentado):
  // const cf = await getCloudflareContext()
  // const { results: contador } = await cf.env.DB.prepare('SELECT value FROM counters WHERE name = ?')
  //   .bind('page_views')
  //   .all()

  // const { results: registros } = await cf.env.DB.prepare(
  //   'SELECT accessed_at FROM access_logs ORDER BY accessed_at DESC LIMIT 5'
  // ).all()

  return {
    count: contadorAtual,
    recentAccess: listaAcessosRecentes
  }
}
