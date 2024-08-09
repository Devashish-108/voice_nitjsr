module.exports = function(router, db){
    router.post('/footer/contact/submit', function(req, res){
        const queryInfo = req.body.queryInfo;

        db.firestore().collection("contact-us").add(queryInfo);
    });
}
