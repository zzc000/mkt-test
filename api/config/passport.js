const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;

const jwt = require('jsonwebtoken');
const JWTSigningSecret = 'AZuYA3rJ4I4hb4SP4dLZYAOuLMdYM1sXZ05LlC-R4-ghzk9pQ-92n_8PIUjeUaCe0dfYhVrgpnUK_QQdOEo-9fzdaEig821zuQ_Fo3m0_HaKBv3vh7Sgq0U7zJsKOavbU0ased6HWTlE7eeXi50peINpGvmn0obu65ngOeG3t3kCoTn-Ha-6jcP5LYnj9lzc6_8isUrfWSM9xPVnbhb6DsVYZ6Tn6_obU1_8SRZaZ6sDUWO1dw0-hmT5Ict5TA2';

passport.use('marketing-cloud', new CustomStrategy(
    function (req, done) {
        // http://www.passportjs.org/docs/authenticate/
        // Do your custom user finding logic here, or set to false based on req object
        //done(error, user);
        if (req.user == null) {
            if (req.body.jwt != null) {
                jwt.verify(req.body.jwt, JWTSigningSecret, function (err, decoded) {
                    if (!err) {
                        console.log('---authenticate success---');
                        done(null, decoded.request);
                    }
                    else {
                        console.log('---authenticate error---');
                        done(null, false, { message: err });
                    }
                });
            }
            else {
                console.log('---empty token---');
                done(null, false, { message: 'Incorrect Marketing Cloud JWT.' });
            }
        }
        else {
            console.log('---existing user---');
            done(null, req.user);
        }
    }
));

passport.serializeUser(function (user, done) {
    console.log('---serializeUser---');
    //console.log(user);
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
    console.log('---deserializeUser---');
    //console.log(user);
    done(null, JSON.parse(user));
});