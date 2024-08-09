module.exports = function(router, db){
    const collection = 'blogs';

    router.get('/blogs/fetch', async function(req, res){
        try {
            await db.auth().signInAnonymously();
            const data = await db.firestore().collection(collection).get();

            await db.auth().currentUser.delete();
            res.send({
                data: data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            })
        } catch (error) {
            res.send({
                error
            })
        }   
    });

    router.post('/blog/create', async function(req, res){
        try {
            const { payload } = req.body;

            await db.auth().signInAnonymously();
            const data = await db.firestore().collection(collection).add(payload);

            await db.auth().currentUser.delete();
            res.send({
                data,
                message: `blog created successfully`
            })
        } catch (error) {
            res.send({
                error
            })
        }   
    });

    router.patch('/blog/updateStatus', async function(req, res){
        try {
            const { id, isApproved } = req.body;

            await db.auth().signInAnonymously();
            const data = await db.firestore().collection(collection).doc(id).update({ isApproved });

            await db.auth().currentUser.delete();
            res.send({
                data,
                message: `${id} approved successfully`
            })
        } catch (error) {
            res.send({
                error
            })
        }   
    });

    router.delete('/blog/delete', async function(req, res){
        try {
            const id = req.body.id;

            await db.auth().signInAnonymously();
            const data = await db.firestore().collection(collection).doc(id).delete();

            await db.auth().currentUser.delete();
            res.send({
                data,
                message: `${id} deleted successfully`
            })
        } catch (error) {
            res.send({
                error
            })
        }   
    });
}
