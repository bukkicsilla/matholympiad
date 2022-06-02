const  express = require('express')
const db = require('../data/database')
const router = express.Router()

router.get('/', function(req, res){
  res.redirect('/problems')
})

router.get('/problems', async function(req, res){
  const [problems] = await db.query('SELECT * FROM matholympiad')
  res.render('mo-list', {problems: problems})
})

router.get('/new-problem', async function(req, res){
  res.render('create-mo')
})

router.post('/problems', async function(req, res){
  const data = [
    req.body.volume,
    req.body.code,
    req.body.content,
    req.body.solution
  ];
  await db.query('INSERT INTO matholympiad (volume, code, body, solution) VALUES (?)', [data]);
  res.redirect('/problems')
})

router.get('/problems/:id', async function(req, res){
  const query = `SELECT id, volume, code, body FROM matholympiad
                 WHERE matholympiad.id = ?`
  const [problem] = await db.query(query, [req.params.id])
  if (!problem || problem.length === 0){
    return res.status(404).render('forofor')
  }
  res.render('mo', {problem : problem[0]})
})

router.get('/problems/:id/solution', async function(req, res){
  const query = `SELECT * FROM matholympiad WHERE matholympiad.id = ?`
  const [problem] = await db.query(query, [req.params.id])
  if (!problem || problem.length === 0){
    return res.status(404).render('forofor')
  }
  console.log(problem[0].id)
  res.render('mo', {problem : problem[0]})
})

router.get('/problems/:id/edit', async function(req, res){
  const query = `SELECT * FROM matholympiad WHERE id = ?`
  const [problem] = await db.query(query, [req.params.id])
  if (!problem || problem.length === 0){
    return res.status(404).render('forofor')
  }
  res.render('update-mo', {problem: problem[0]})
})

router.post('/problems/:id/edit', async function(req, res){
  const query = `UPDATE matholympiad SET volume = ?, code = ?, body = ?, solution = ? WHERE id = ?`
  await db.query(query, [
    req.body.volume,
    req.body.code,
    req.body.content,
    req.body.solution,
    req.params.id])
  res.redirect('/problems')
})

router.post('/problems/:id/delete', async function(req, res){
  await db.query(`DELETE FROM matholympiad WHERE id = ?`, [req.params.id])
  res.redirect('/problems')
})

module.exports = router