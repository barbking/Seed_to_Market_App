var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
// var pg = require('pg');
//
// // set up config for the pool
// var config = {
//   database: 'seed-to-market',
//   host: 'localhost',
//   port: 5432,
//   max: 10
// }; // end config
//
// // setup new pool
// var pool = new pg.Pool( config );
var pool = require('../modules/pool');

// GET route to retrieve all suppliers
router.get( '/getAll', function ( req, res ) {
  console.log( 'in get all suppliers' );
  // verify authentication
  if ( req.isAuthenticated() ) {
    console.log( 'fetching suppliers' );
    pool.connect(function(err, connection, done) {
      var suppliers = [];
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        var resultSet = connection.query( "SELECT * FROM suppliers WHERE user_id=$1 and active = true", [ req.user.user_id ]); // end connection.query
        resultSet.on( 'row', function( row ){
          suppliers.push( row );
        });
        resultSet.on( 'end', function(){
          done();
          res.status( 200 ).send( suppliers );
        }); //end on end
      } // end if err
    }); // end pool.connect
  } else {
    console.log( 'authentication error' );
    res.status( 403 ).send( 'authentication error, try relogging in' );
  } // end if authenticated
}); // end GET getAll

router.post( '/addSupplier', function ( req, res ) {
  console.log( 'in add to suppliers' );
  // verify authentication
  if ( req.isAuthenticated() ) {
    console.log( 'adding supplier' );
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        connection.query( "INSERT INTO suppliers ( name, website, phone_number, address, city, state, zip, description, user_id ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )", [ req.body.name, req.body.website, req.body.phone_number, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.description, req.user.user_id ], function ( err, result ) {
          if ( err ) {
            console.log( 'error:', err );
            res.status( 500 ).send( 'Error creating new supplier' );
          } else {
            done();
            res.status( 201 ).send( 'supplier added to database' );
          }
        }); // end connection.query
      } // end if err
    }); // end pool.connect
  } else {
    console.log( 'authentication error' );
    res.status( 403 ).send( 'authentication error, try relogging in' );
  } // end if authenticated
}); // end POST to addSupplier

//edit supplier PUT
router.put('/editSupplier', function(req, res){
console.log('in router PUT for edit supplier', req.query);
  var newSeed = req.query;
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
          connection.query("UPDATE suppliers SET name = $1 , website = $2 , phone_number = $3 , address = $4 , city = $5 , state = $6 , zip = $7 , description = $8 WHERE supplier_id = $9 ", [req.query.name, req.query.website, req.query.phone_number, req.query.address, req.query.city, req.query.state, req.query.zip, req.query.description, req.query.supplier_id]);

        done();
        res.sendStatus(200);
      } //end else
    }); //end pool
  } else {
    res.sendStatus(403);
  }
});//end PUT

router.put('/removeSupplier', function ( req, res ){
  console.log('in deactivate supplier route on server with-->', req.query.supplier_id);
  if (req.isAuthenticated()) {
    console.log( 'deactivating supplier' );
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        connection.query( "UPDATE suppliers SET active = false WHERE supplier_id = $1 and user_id = $2 ", [ req.query.supplier_id, req.user.user_id], function ( err, result ) {
          if ( err ) {
            console.log( 'error:', err );
            res.status( 500 ).send( 'Error removing supplier' );
          } else {
            done();
            res.status( 201 ).send( 'deactivated in database' );
          }
        }); // end connection.query
      } // end if err
    }); // end pool.connect
    } else {
    console.log( 'authentication error' );
    res.status( 403 ).send( 'authentication error, try relogging in' );
    } // end if authenticated
    }); // end POST to addSupplier


module.exports = router;
