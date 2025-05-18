import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext
import { teamMembers } from '../data/teamMembersData'; // Assuming your team data is in this file

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

const memberDetailsVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
};

function TeamMemberPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const memberId = parseInt(id);
    const foundMember = teamMembers.find((m) => m.id === memberId);
    setMember(foundMember);
  }, [id]);

  if (!member) {
    return (
      <motion.div
        className={`py-16 flex justify-center items-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} text-lg`}>
          Team member not found. <Link to="/team" className="text-indigo-500 hover:underline">Back to Team</Link>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`py-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className={`max-w-lg mx-auto rounded-lg shadow-md p-8 text-center ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
          variants={memberDetailsVariants}
        >
          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
            <img
              src={member.image}
              alt={member.name}
              className="object-cover w-full h-full"
              style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
            />
          </div>
          <h2 className={`text-2xl font-semibold mb-2 ${theme === 'light' ? 'text-indigo-700' : 'text-indigo-400'}`}>
            {member.name}
          </h2>
          <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{member.role}</p>
          <p className={`text-gray-700 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-6`}>{member.description}</p>
          <Link
            to="/team"
            className={`inline-block font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ${
              theme === 'light' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-700 hover:bg-indigo-800 text-white'
            }`}
          >
            Back to Team
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TeamMemberPage;