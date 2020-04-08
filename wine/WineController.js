module.exports = app => {

    const { clientsBiggerValue , clientBiggerLast , clientsFaithful } = app.functions.functions;


    app.get("/wine/clientsBiggerValue", (req, res) => {

        res.status(200).render("wine/clientsBiggerValue", {clientsBiggerValue });

    });

    app.get("/wine/clientBiggerLast", (req, res) => {

        res.status(200).render("wine/clientBiggerLast", {clientBiggerLast } );

    });


    app.get("/wine/clientsFaithful", (req, res) => {


        res.status(200).render('wine/clientsFaithful', { clientsFaithful});


    });



}