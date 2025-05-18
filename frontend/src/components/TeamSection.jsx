import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a ThemeContext

function TeamSection({ teamMembersData, teamVariants, teamMemberVariants }) {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl font-semibold text-center mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Meet Our Team
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          animate="animate"
          variants={teamVariants}
        >
          {teamMembersData.map((member) => (
            <motion.div
              key={member.id}
              className={`rounded-lg shadow-md p-6 text-center ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} card-lift`}
              variants={teamMemberVariants}
              whileHover="hover"
            >
              <Link to={`/team/${member.id}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover cursor-pointer shadow-md"
                  style={{ filter: theme === 'dark' ? 'brightness(0.9)' : 'none' }}
                />
              </Link>
              <h5 className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-indigo-700' : 'text-indigo-400'}`}>
                {member.name}
              </h5>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;