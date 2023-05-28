import mysql from 'mysql2/promise';

export default async function conectar(){

    if (global.conexao && global.conexao.status !== "disconnected"){
        return global.conexao;
    }

    const conn = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"backend1"
    });

    global.conexao = conn;
    return conn;
}