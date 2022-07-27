const express  = require('express')
const path     = require('path')
const mongoose = require('mongoose')
const User     = require('./model/user')
const Note     = require('./model/note')
const jwt      = require('jsonwebtoken')
const { createHash } = require('crypto')

const sha256 = (data) => {
    const hasher = createHash('sha256');
    hasher.update(data);
    return hasher.digest('hex');
}

const JWT_SECRET = 'bdhg91hgsfhg532gdyt9p0873@#%^&)(*19837487ugfcbnksj'

const parseId = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET).id
    } catch {
        return undefined
    }
};

const authFailedError = {
     status: 'error', error: 'Invalid username/password',
}


mongoose.connect('mongodb://localhost:27017/miniproject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()

app.use('/', express.static(path.join(__dirname, 'static')))

app.use(express.json())

app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if(!plainTextPassword || typeof(plainTextPassword) !== 'string'){
        return res.json({ status: 'error', error: 'Invalid password'})
    }

    if(plainTextPassword.length < 8){
        return res.json({ 
            status: 'error',
            error: 'Password should be at least 8 characters'
        })   
    }

    try{
        const { id: _id } = jwt.verify(token, JWT_SECRET)

        const password = sha256(plainTextPassword)

        await User.updateOne(
            {_id},
            { $set: { password } },
        )

        res.json({ status: 'okay'})
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Oops!'})
    }
})

app.post('/api/login', async (req, res) => {;
    const { username, password: plainTextPassword } = req.body;

    const password = sha256(plainTextPassword)
    console.log(password);

    const user = await User.findOne({ username }).lean()

    if(!user) return res.json(authFailedError);
 
    if ( password === user.password) {
        const token = jwt.sign({
           id: user._id, username: user.username
        }, JWT_SECRET)
        return res.json({ status: 'okay', data: token })
    }
    return res.json(authFailedError)
});

app.post('/api/register', async (req, res) => {
    const {
        username,
        email,
        password: plainTextPassword,
        pwdRepeat,
    } = req.body;

    if(!username || typeof(username) !== 'string' || !email || typeof(email) !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username/email-id'})
    }

    if(!plainTextPassword || typeof(plainTextPassword) !== 'string'){
        return res.json({ status: 'error', error: 'Invalid password'})
    }

    if(plainTextPassword.length < 8){
        return res.json({ status: 'error', error: 'Password should be at least 8 characters'})
    }
    
    if(plainTextPassword != pwdRepeat){
        return res.json({ status: 'error', error: 'Passwords do not match!'})
    }

    const password =  sha256(plainTextPassword)
    console.log(password)

    try{
        const result = await User.create({
            username,
            email,
            password,
        })
        console.log('User created successfully', result)
    }catch(error){
        if(error.code === 11000){
            return res.json({ status: 'error', error: 'Username exists' })
        }
        throw error
    }
}) 

const parseNote = ({
    _id: id, body, date, favourite, title,
}) => ({
     id, body, date, favourite, title,
 });

const parseNoteDoc = ({ _doc: doc }) => parseNote(doc);

const getNotes = async (owner) => Note
  .find({ owner }, '_id body date favourite title').exec();

app.get('/api/notes', async (req, res) => {
    const token = req.headers.authorization;
    const id = parseId(token);
    if (!id) return res.json({ status: 'error', error: 'Authorization failed' })
    const notes = await getNotes(id);
    return res.json({ data: notes.map(parseNoteDoc) });
})

const createNote = async (payload) => {
    const result = await Note.create(payload);
    return parseNoteDoc(result);
};

const updateNote = async (id, payload) => {
    const result = await Note.updateOne(
        { _id: id },
        { $set: payload },
    ).exec();
    if (!result.acknowledged) return undefined;
    const { owner, ...data } = payload;
    return { id, ...data };
};

app.post('/api/notes', async (req, res) => {
    const token = req.headers.authorization;
    const userId = parseId(token);
    if (!userId) return res.json({ status: 'error', error: 'Could not authorize' })
    const { id, body, favourite = false, title } = req.body;
    const payload = {
        body,
        date: new Date().toISOString(),
        favourite,
        owner: userId, 
        title,
     };
    const note = id
      ? await updateNote(id, payload)
      : await createNote(payload);
    if (!note) return res.json({ status: 'error', error: 'Unknown error' })
    const { owner, ...data } = note;
    return res.json({ status: 'okay', data })
})

app.delete('/api/notes', async (req, res) => {
    const token = req.headers.authorization;
    const userId = parseId(token);
    if (!userId) return res.json({ status: 'error', error: 'Could not authorize' })
    const { id } = req.body;
    const notes = await getNotes(userId);
    if (!notes.find(({ id: noteId }) => id === noteId)) {
        return res.json({ status: 'error', error: 'Note does not exist' });
    }
    const result = await Note.findByIdAndDelete(id).exec();
    return res.json({ status: 'okay', data:parseNote(result) })
});

app.listen(9999, () => {
    console.log('Server up at 9999')
})
