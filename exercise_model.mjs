import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);


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


// .save() returns a promise & if successful -> JSobject*
const createExercise = async(name, reps, weight, unit, date) =>{
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date })
    // all of these (&&) must be true for us to create
    console.log('createExercise')
    console.log(exercise)
    if (weight > 0){
        if (reps > 0){
            if (name.length > 0) {
                if (unit === "lbs" || unit === "kgs"){
                    if (isDateValid(date) === true){
                        return exercise.save()
        }
    }
}
        }
    }
}



const findExercises = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}



const findExercisesById = async(exerciseId) => {
    const result = await Exercise.findById(exerciseId).exec();
    return result
}


//TODO: model doing too much work, none here ret result***
const updateExercise = async(filter, update, date,reps,weight) => {

    try {
        // needs to be above 'const result' line- result gets updated if below
        if (isDateValid(date.date) === false){
            console.log('welp1')
            return { "Error" : "Not found"}
        }

        // 12/2/22  invalid reps/weight changes 
        if (reps.reps < 1){
            console.log('LOW REPS')
            return 41
        }

        if (weight.weight < 1){
            console.log('LOW WEIGHT')
            return 41
        }


        const result = await Exercise.updateOne(filter,update);
        // 1) catching error before calling updateOne
        console.log('date')
        console.log(date.date)
        console.log(isDateValid(date.date))
        console.log('filter')

        if (result.matchedCount === 1){
            if (result.modifiedCount === 0){
                return 42
            }
        }

        if (result.matchedCount === 0){
            console.log('maybeblock1')
            if (result.modifiedCount === 0) {
                console.log('maybeblock2')
                console.log('first')
                return { "Error" : "Not found"}
            }
        } else {
        // returning result property
        return result.modifiedCount;
        }
    } catch (error) {
        console.log('second')
        return { "Error" : "Not found"}
    }
}

/** 
 * alt consideration exercise.deleteById()
*/
const deleteByID = async (_id) => {
    const result = await Exercise.deleteOne(_id);
    return result.deletedCount;
}



db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


export { createExercise, findExercisesById, findExercises, updateExercise, deleteByID }