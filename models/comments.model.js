const db = require("../db");

exports.removeCommentById = async (id) => {
    const noComment = await db.query(
        "SELECT * FROM comments WHERE comment_id = $1;",
        [id]
    );
    if (noComment.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
    }

    const deleted = await db.query(
        `DELETE FROM comments WHERE comment_id = $1;`,
        [id]
    );
    return deleted;
};

exports.fetchAllComments = async () => {
    const { rows } = await db.query(`SELECT * FROM comments`);
    return rows;
};
exports.addVotesByCommentId = async (id, increment, reqLength) => {
    if (increment === undefined || increment.length === 0 || reqLength > 1) {
        return Promise.reject({ status: 400, msg: "invalid input" });
    }
    const { rows } = await db.query(
        `UPDATE comments 
    SET votes = votes + $1 
    WHERE comment_id = $2 RETURNING *;`,
        [increment, id]
    );
    console.log(rows[0]);
    return rows[0];
};