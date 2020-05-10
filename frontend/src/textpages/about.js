import React from 'react';
import "./About.scss";
import naomi from '../assets/team/naomi.png';
import fabian_katz from '../assets/team/fabian_katz.png';
import moritz from '../assets/team/moritz.png';
import marco from '../assets/team/marco.png';
import nicolai from '../assets/team/nicolai.png';
import fabian from '../assets/team/fabian.png';
import lea from '../assets/team/lea.png';
import silvia from '../assets/team/silvia.png';
import lisa from '../assets/team/lisa.png';
import laura from '../assets/team/laura.png';
import volker from '../assets/team/volker.png';
import nico from '../assets/team/nico.png';
import balint from '../assets/team/balint.png';
import ines from '../assets/team/ines.png';
import philipp from '../assets/team/philipp.png';
import david from '../assets/team/david.png';
import akolade from '../assets/team/akolade.png';
import cynthia from '../assets/team/cynthia.png';
import chiara from '../assets/team/chiara.png';
import thomas from '../assets/team/thomas.png';


const departments = [

    { 
      title: 'Project coordination', 
      people: [
        {name: 'Fabian Katz', image: fabian_katz, link: 'https://www.linkedin.com/in/fabian-katz/', position: 'Project coordination'},
        {name: 'Marco Schmid', image: marco, link: 'https://www.linkedin.com/in/marco-schmid-1a39861a4/',  position: 'Project coordination'},
        {name: 'Nicolai Huss', image: nicolai, link: 'https://www.linkedin.com/in/nicolai-huss/', position: 'Project coordination'}, 

      ]
    }, 
  
    { 
      title: 'Innovation', 
      people: [
        {name: 'Moritz Giebel', image: moritz, link: 'https://www.linkedin.com/in/moritz-giebel-030054153/', position: 'Innovation'},
        {name: 'Chiara Demming', image: chiara, link: 'https://www.linkedin.com/in/chiara-demming-5b81171a8/', position: 'Innovation'},
        {name: 'Thomas Betz-Mors', image: thomas, link: 'https://www.linkedin.com/in/thomas-b-288a08136/', position: 'Innovation'}, 

      ]
    }, 
  
    { 
      title: 'Finance', 
      people: [
        {name: 'Volker Jetter', image: volker, link: 'https://www.linkedin.com/in/volker-jetter-0bb412ba/', position: 'Finance'},
        {name: 'Nico Buchsenstein', image: nico, link: 'https://www.linkedin.com/in/nicobuechsenstein/', position: 'Finance'},

      ]
    }, 
  
    { 
      title: 'Marketing', 
      people: [
        {name: 'Fabian Ochs', image: fabian, link: 'https://www.linkedin.com/in/fabian-ochs-395b701a7/', position: 'Marketing'},
        {name: 'Lea Joos', image: lea, link: 'https://www.linkedin.com/in/lea-joos-5808a5174/', position: 'Marketing'},
        {name: 'Silvia Mogas', image: silvia, link: 'https://www.linkedin.com/in/silviamogas/', position: 'Marketing'},
        {name: 'Lisa Heite', image: lisa, link: 'https://linkedin.com/in/lisa-heite', position: 'Marketing'},
        {name: 'Laura Maria Kassovicova', image: laura, link: 'https://www.linkedin.com/in/lauramariak/', position: 'Marketing'}, 

      ]
    }, 
    { 
      title: 'Design', 
      people: [
        {name: 'Balint Csizmadia', image: balint, link: 'https://www.linkedin.com/in/balint-design/', position: 'Branding/UX design'},
        {name: 'Ines Filipp', image: ines, link: 'https://www.linkedin.com/company/wearecovexit/', position: 'Branding/UX design'},
    
      ]
    },    { 
      title: 'Development', 
      people: [
        {name: 'Philipp Veller', image: philipp, link: 'https://www.linkedin.com/in/philipp-veller-webdev/', position: 'Lead Developer'},
        {name: 'David Doan', image: david, link: 'https://www.linkedin.com/in/ddoan89/', position: 'Developer'},
        {name: 'Naomi Wickham', image: naomi, link: 'https://www.linkedin.com/in/naomiwickham/', position: 'Developer'},
        {name: 'Akolade Adesanmi', image: akolade, link: 'https://www.linkedin.com/in/akolade-adesanmi-156276142/', position: 'Developer'},
        {name: 'Cynthia Mulenga', image: cynthia, link: 'https://www.linkedin.com/in/cynthiammulenga/', position: 'Developer'},   
             
      ]
    }, 
  ]
    
 
export default (<>

  <div className="About">
    <h1>About</h1>
    <p><strong>What is Covexit?</strong></p>
    <p>Covexit is an online marketplace that enables local retailers to easily offer their products online and thereby help to overcome the corona crisis.</p>
    <p>A team of experts will support you with the preparations for your account, so that it is as easy as possible for you to bring your business online</p>
    <p><strong>Who are Covexit?</strong></p>
    <p>Covexit started as an initiative by students from the KIT in Karlsruhe. Seeing shops in their area having to close due to Covid-19 motivated them to start the online marketplace
     and help particularly those local shops stay connected with their customers and continue their business.</p>
    <p>During the German #WirVsVirus Hackathon, then #TheGlobalHack and later #EUvsVirus, the team grew and is now made up of developers, marketing and communications experts, business strategists and many more.</p>
    <p>We, the Covexit Team, are happy that you found your way to this platform and are interested in the project. Feel free to reach out to us! </p>
</div>
    <h1>Meet the Team!</h1>
    <section className="Team-members">
      <div className="Team">
        {departments.map(department=> (
        <ul>
          <p><strong >{department.title}</strong></p>
          <li key={department.people.name} className="Team-member">
            <div className="Team-member-image">
            <a href="" rel="noopener noreferrer" target="_blank" ><img src="" alt="" />
            </a>
            </div>
            <div className="Team-member-body">
            <p><strong></strong></p>
            <p></p>
            </div>
          </li>
        </ul>
        ))}
      </div>
    </section>
</>);
  