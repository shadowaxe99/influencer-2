import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Importing shared dependencies
from src.shared_dependencies import userProfile, brandCollaborations, contentIdeas, pressReleases, legalAdvice, contactDatabase, appointmentSchedule, strategyInsights, postPerformance, apiIntegrations

// Importing components
import Profile from '../components/Profile';
import BrandCollaborations from '../components/BrandCollaborations';
import ContentIdeas from '../components/ContentIdeas';
import PressReleases from '../components/PressReleases';
import LegalAdvice from '../components/LegalAdvice';
import ContactDatabase from '../components/ContactDatabase';
import AppointmentSchedule from '../components/AppointmentSchedule';
import StrategyInsights from '../components/StrategyInsights';
import PostPerformance from '../components/PostPerformance';
import ApiIntegrations from '../components/ApiIntegrations';

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>AI Agent System for Influencers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Profile userProfile={userProfile} />
        <BrandCollaborations brandCollaborations={brandCollaborations} />
        <ContentIdeas contentIdeas={contentIdeas} />
        <PressReleases pressReleases={pressReleases} />
        <LegalAdvice legalAdvice={legalAdvice} />
        <ContactDatabase contactDatabase={contactDatabase} />
        <AppointmentSchedule appointmentSchedule={appointmentSchedule} />
        <StrategyInsights strategyInsights={strategyInsights} />
        <PostPerformance postPerformance={postPerformance} />
        <ApiIntegrations apiIntegrations={apiIntegrations} />
      </main>

      <footer>
        <p>© 2022 Dr. A. I. Virtuoso</p>
      </footer>
    </div>
  );
};

export default HomePage;