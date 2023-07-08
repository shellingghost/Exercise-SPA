import 'dotenv/config';
import * as exercise from './exercise_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

//TODO: CHECK TODO's
//todo: issue with missing / invalid 400 requests not spec enough (missing || invalid 400's)
//todo: check back in with professor on Microsoft Teams for answer to question***
/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create a new exercise with the title, year and language provided in the body
 */
 app.post('/exercises', (req, res) => {
    // two things happening: creation happens at model level, responding happens at controller level
    // appropriately: 1) block creation 2) respond 
    console.log('req info')
    console.log(req.body.unit)
    console.log(req.body)
    exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            // TODO: Remove x1 typeof line below  &&CHECK SPECS AGAINST BELOW
            // reference above todo:asking prof. about name of exercise '33' validity etc.
            //console.log('exercise')
            //console.log(exercise)
            //console.log('name')
            //console.log(exercise.name)
            //console.log('reps')
            //console.log(typeof exercise.reps)
            //console.log('weight')
            //console.log(typeof exercise.weight)
            //console.log('unit')
            //console.log(typeof exercise.unit)
            //console.log('date')
            //console.log(typeof exercise.date)



            if (typeof req.body.name !== "string" || req.body.name.length < 1){
                console.log('CATCH1')
                return res.status(400).json({ Error: "Invalid request" });

            } else if (typeof req.body.reps !== "number"|| req.body.reps < 1){
                console.log('CATCH2')
                console.log(typeof req.body.reps)
                console.log(req.body.reps)

                return res.status(400).json({ Error: "Invalid request" });
            
                //todo: this gets through AND sends a 400 (?) a9-test req#
            } else if (typeof req.body.reps !== "number"||req.body.weight < 1){
                console.log('CATCH3')
                return res.status(400).json({ Error: "Invalid request" });
            
            } else if (req.body.unit !== "kgs" && req.body.unit !== "lbs"){
                console.log('CATCH4')
                return res.status(400).json({ Error: "Invalid request" });

            } else if (isDateValid(req.body.date) !== true){
                console.log('CATCH5')
                return res.status(400).json({ Error: "Invalid request" });

            } else {
                res.status(201).json(exercise);
            }

        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            console.log('CATCH')
            res.status(400).json({ Error: "Invalid request" });
        });
});




/**
 * Retrieve movies. 
 * If the query parameters include a year, then only the movies for that year are returned.
 * Otherwise, all movies are returned.
 */

app.get('/exercises', (req, res) => {
    let filter = {};
    exercise.findExercises(filter, '', 0)
        .then(exercise => {         
            res.send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});


/**
 * Retrive the movie corresponding to the ID provided in the URL.
 */

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercise.findExercisesById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
            })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});



/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
*/

//req 14 edit*** 404 -> 400 for missing field
//Partitioning & labeling issue// {}, read docs & probe conditionals - 11/8/2022
// two things are happening: 1) catching before creation/modification 2) responding to req
app.put('/exercises/:_id', (req, res) => {
    exercise.updateExercise({ _id: req.params._id}, {name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date},{date: req.body.date}, {reps: req.body.reps}, {weight: req.body.weight})
        .then(numUpdated => {

            // 12/2/22  invalid reps/weight changes 
            console.log('CHECKNUM')
            console.log(numUpdated)

            if (numUpdated === 41){
                return(res.status(400).json({ Error: "Invalid request" }))
            }

            console.log('app.put: 1')
            console.log(req.body.date)
            console.log(isDateValid(req.body.date)=== false)
            //differentiate404 and 400 --- if not found do something***

            // 2) responding to invalid date
            if (isDateValid(req.body.date)=== false){
                console.log('gotem')
                return(res.status(400).json({ Error: "Invalid request" }))
            }
            console.log('app.put: 2')
            // gate to check that inputs exist
            console.log(req.body.date)
            if (req.body.name === '' || req.body.reps === '' || req.body.weight === '' || req.body.unit === '' || req.body.date === ''){ 
                return res.status(400).json({ Error: "Invalid request" });
            } 


            //console.log(typeof req.body.name === 'string')
            //console.log(typeof req.body.weight === 'number')

            // gate to check appropriate types
            if (typeof req.body.name !== 'string' || typeof req.body.reps !== 'number' || typeof req.body.weight !== 'number' || typeof req.body.unit !== 'string' || typeof req.body.date !== 'string'){ 
                return res.status(400).json({ Error: "Invalid request" });
            } 

            console.log('!!!')
            console.log('!!!')
            console.log('app.put: 3')
            console.log(numUpdated)
            //### Request 16: Update for non-existent ID. 404 status code
            console.log(numUpdated === 0)
            console.log(numUpdated['Error'] === 'Not found')
            if (numUpdated['Error'] === 'Not found'){
                return res.status(404).json({ Error: 'Not found' });
            }

            console.log('skip')
            // if we have not updated anything 
            //if (numUpdated !== 1 || numUpdated !== 0){
            if (numUpdated === 0){
                return res.status(404).json({ Error: 'Not found' });
            }

            

            //TODO: immediate*
            //why isn't numUpdated reading? --- do a console.log
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else if (numUpdated === 42){
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})

            }else {
                // switch error codes, may have to overhall*
                //console.log('controller1')
                //res.status(404).json({ Error: 'Not found' });
                console.log('controller1')
                console.log(numUpdated)
                res.status(400).json({ Error: 'Invalid request' });
                // fine-tune numUpdated ex: invalid property 400 status code vs 404 error not found etc
            }
        })
        .catch(error => {
            //TODO: 11/22/2022 TEST THIS -> issues proc'ing
            console.log('controller2')
            //console.log(numUpdated)
            console.error(error);
            res.status(400).json({ Error: 'Invalid request' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 
app.delete('/exercises/:_id', (req, res) => {
    res.status(501).send({ Error: "Not implemented yet" });
});
 */

app.delete("/exercises/:_id", async (req, res) => {
    const removedData = await exercise.deleteByID({_id: req.params._id})
    if (removedData === 1) {
        res.status(204).send();
    } else{
        // TODO: Body: A JSON object { Error: "Not found"} <- quotations issue?
        res.status(404).json({ "Error": "Not found" });
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
