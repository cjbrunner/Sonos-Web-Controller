import pool from '../lib/db';

const getData = async () => {
  try {
    const {rows} = await pool.query('SELECT * FROM test');
    console.log(`result: ${JSON.stringify(rows)}`)
    return rows
  } catch (error) {
    console.log(`error: ${JSON.stringify(error)}`)
  }
}

export default async function Page() {
  const value = await getData();
  console.log(`value: ${JSON.stringify(value)}`)
  return (
    <div>
      <h1>Future home of the ChrisWeb archive</h1>
      <h3>Values: {value.map(r => r.title)}</h3>
    </div>
  )
}