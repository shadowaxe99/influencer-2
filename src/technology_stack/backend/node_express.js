const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Importing Schemas
const UserProfile = require('./database/UserProfileSchema');
const BrandCollaboration = require('./database/BrandCollaborationSchema');
const ContentIdea = require('./database/ContentIdeaSchema');
const PressRelease = require('./database/PressReleaseSchema');
const LegalAdvice = require('./database/LegalAdviceSchema');
const Contact = require('./database/ContactSchema');
const Appointment = require('./database/AppointmentSchema');
const StrategyInsight = require('./database/StrategyInsightSchema');
const PostPerformance = require('./database/PostPerformanceSchema');
const ApiIntegration = require('./database/ApiIntegrationSchema');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/influencerDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Welcome to the Influencer AI Agent System');
});

// Routes for each feature
app.use('/profile', UserProfile);
app.use('/brandCollaboration', BrandCollaboration);
app.use('/contentIdea', ContentIdea);
app.use('/pressRelease', PressRelease);
app.use('/legalAdvice', LegalAdvice);
app.use('/contact', Contact);
app.use('/appointment', Appointment);
app.use('/strategyInsight', StrategyInsight);
app.use('/postPerformance', PostPerformance);
app.use('/apiIntegration', ApiIntegration);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));