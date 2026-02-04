import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, 
  FaGitAlt, FaFigma, FaAws 
} from 'react-icons/fa'
import { 
  SiTypescript, SiJavascript, SiFlutter, SiMongodb, 
  SiPostgresql, SiFirebase, SiTailwindcss, SiNextdotjs 
} from 'react-icons/si'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: <FaReact />, level: 95 },
        { name: 'Vue.js', icon: <FaVuejs />, level: 85 },
        { name: 'Next.js', icon: <SiNextdotjs />, level: 90 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 90 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 95 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 90 }
      ]
    },
    {
      title: 'Mobile',
      skills: [
        { name: 'React Native', icon: <FaReact />, level: 90 },
        { name: 'Flutter', icon: <SiFlutter />, level: 85 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 88 },
        { name: 'Python', icon: <FaPython />, level: 80 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 82 },
        { name: 'Firebase', icon: <SiFirebase />, level: 88 }
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, level: 92 },
        { name: 'Docker', icon: <FaDocker />, level: 80 },
        { name: 'AWS', icon: <FaAws />, level: 75 },
        { name: 'Figma', icon: <FaFigma />, level: 85 }
      ]
    }
  ]

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="skills-container" ref={ref}>
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3>{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-item card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                        />
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
