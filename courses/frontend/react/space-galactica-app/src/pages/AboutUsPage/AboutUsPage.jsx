import styles from './AboutUsPage.module.css';

// Task - Week 1
// After you are finished with creating the page, move the OurValues, OurCrew, OurPartners components into their own files in this folder.
// Import and use the components from the newly created files.

const OurValues = () => {
  // Task - Week 1
  // Create the "Our Values" section.
  // Use the descriptions provided in /src/pages/AboutUsPage/README.md.
  // Some inspiration ideas can be found in /data/inspiration_about_us.
  return (
    <p> ADD OUR VALUES HERE </p>
  );
};

const OurCrew = () => {
  // Task - Week 1
  // Create the "Our Crew section".
  // Use the descriptions provided in /src/pages/AboutUsPage/README.md.
  // Use the pictures from /public/crew.
  // Some inspiration ideas can be found in /data/inspiration_about_us.
  return (
    <p> ADD OUR CREW HERE </p>
  );
}

const OurPartners = () => {
  // Task - Week 1
  // Create the "Our Partners section".
  // Use the descriptions provided in /src/pages/AboutUsPage/README.md.
  // Use the pictures from /public/business_partners.
  // Some inspiration ideas can be found in /data/inspiration_about_us.
  return (
    <p> ADD OUR PARTNERS HERE </p>
  );
}


export const Crew = () => {
  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>About us</h1>
        <section className="card">
          <h2>Our Values</h2>
          <OurValues/>
        </section>
        <section className="card">
          <h2>The crew</h2>
          <OurCrew/>
        </section>

         {/* Task - Week 1 */}
         {/* Use the "OurPartners" component here. */}
      </main>
    </div>
  );
}

export default Crew;
