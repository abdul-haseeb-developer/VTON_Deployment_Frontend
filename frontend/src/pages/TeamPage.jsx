import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext
import TeamSection from '../components/TeamSection'; // Assuming TeamSection is in this path
import { teamMembers } from '../data/teamMembersData'; // Assuming your team data is here

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.2, duration: 0.6, staggerChildren: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const memberVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
};

function TeamPage() {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`py-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className={`text-3xl font-semibold text-center mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
          variants={memberVariants}
        >
          Our Dedicated Team
        </motion.h2>
        <TeamSection
          teamMembersData={teamMembers}
          teamVariants={containerVariants}
          teamMemberVariants={memberVariants}
        />
      </div>
    </motion.div>
  );
}

export default TeamPage;