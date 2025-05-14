'use client';

import {cn} from '@/lib/utils';
import Navigation from '@/components/ui/navigation';

export default function DesignProcess() {

  const h1 = "text-4xl sm:text-5xl lg:text-5xl font-bold"
  const paragraph = "text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto"
  const link = "text-blue-500 hover:text-blue-700 transition-colors duration-200"
  return (
    <div className="w-full bg-neutral-50 flex">
      <div
        className={cn(
          'space-y-10 flex-grow px-4 w-full py-8 sm:px-8 md:px-12 lg:px-20 flex items-center justify-center flex-col transition-all duration-500',
        )}>
        <Navigation />

        <div className="space-y-6">
            <h1 className={h1}>Project Overview</h1>
            <p className={paragraph + " italic"}>
          A tool to create simple language descriptions for museum art.
            </p>
            <p className={paragraph}>
          Museums often provide descriptions of their artworks and exhibits that 
          aim to educate visitors about the background or significance of a piece.
           However, lengthy or dense descriptions may create challenges for 
           casual visitors or those with cognitive impairments. Our project, 
           MochaSimplifier, aims to
                 language descriptions for museum art in order to alleviate such 
                 challenges and make museum content more accessible to all audiences. 
                 MochaSimplifier is a web-based platform that allows users to upload an 
                 image of a museum text description and generate simpler, more easily 
                 understandable versions.   
            </p>
            <h1 className={h1}>Needfinding</h1>
            <p className={paragraph}>
              <strong>Needfinding</strong> is the process of finding gaps in existing 
              systems for a specific audience. This prototype aims to address barriers in 
              museums for individuals with cognitive disabilities. We read the following 
              papers in order to understand their needs:
            </p>
            <ul className={paragraph + " list-disc list-inside"}>
              <li className="mb-2">
                Moreno, L., Petrie, H., Martínez, P. et al. <a className={link} href="https://link.springer.com/article/10.1007/s10209-023-00986-z" target="_blank" rel="noopener noreferrer">
                  Designing user interfaces for content simplification aimed at people with cognitive impairments. 
                </a>
                Univ Access Inf Soc 23, 99–117 (2024).
              </li>
              <li className="mb-2">
                <a className={link} href="https://www.youtube.com/watch?v=MxmGuhG9c1k" target="_blank" rel="noopener noreferrer">
                  "Simplifying Content for People with Cognitive Disabilities."
                </a>
                YouTube, uploaded by IBM Research, Sep 18, 2017.
              </li>
              <li className="mb-2">
                Uziel-Karl, Sigal, and Tenne-Rinde, Michal. <a className={link} href="https://www.degruyterbrill.com/document/doi/10.1515/9781614514909-042/pdf?licenseType=restricted" target="_blank" rel="noopener noreferrer">
                  “Making language accessible for people with cognitive disabilities: Intellectual disability as a test case.” 
                </a> In Handbook of Communication Disorders: Theoretical, Empirical, and Applied Linguistic Perspectives, edited by Elitzur H.G. Dattner and Dorit Ravid, pp. 845–860. Berlin/Boston: De Gruyter Mouton, 2018.
              </li>
              <li className="mb-2">
                Hu, Ruimin and Feng, Jinjuan Heidi. <a className={link} href="https://dl.acm.org/doi/abs/10.1145/2729981" target="_blank" rel="noopener noreferrer">
                  "Investigating Information Search by People with Cognitive Disabilities." 
                </a> ACM Transactions on Accessible Computing 7, no. 1 (2015): Article 1, 30 pages.
              </li>
              <li className="mb-2">
                Ravelli, Louise J. <a className={link} href="https://www.sciencedirect.com/science/article/abs/pii/S0898589896900170" target="_blank" rel="noopener noreferrer">
                  "Making language accessible: Successful text writing for museum visitors." 
                </a> Linguistics and Education 8, no. 4 (1996): 367–387.
              </li>
              <li className="mb-2">
                Garcia Carrizosa, H., Sheehy, K., Rix, J., Seale, J., and Hayhoe, S. <a className={link} href="https://www.emerald.com/insight/content/doi/10.1108/jet-08-2019-0038/full/html" target="_blank" rel="noopener noreferrer">
                  "Designing technologies for museums: accessibility and participation issues." 
                </a> Journal of Enabling Technologies 14, no. 1 (2020): 31–39.
              </li>
              <li className="mb-2">
                Soares Guedes, Leandro, and Landoni, Monica (Supervisor). <a className={link} href="https://folia.unifr.ch/global/documents/328319" target="_blank" rel="noopener noreferrer">
                  PhD Thesis. 
                </a> Università della Svizzera italiana, 2024.
              </li>
              <li className="mb-2">
                Soares Guedes, Leandro; Zanardi, Irene; Mastrogiuseppe, Marilina.  <a className={link} href="https://folia.unifr.ch/global/documents/328205" target="_blank" rel="noopener noreferrer">
                  "Proceedings of the European Conference on Cognitive Ergonomics 2023." 
                </a> ECCE ’23, pp. 1–8.
              </li>
            </ul>
            <p className={paragraph}>
              In our affinity diagram, we organized these needs into six broad categories:
            </p>
            <ol className={paragraph + " list-decimal list-inside"}>
              <li className="mb-2">
                Content transformation: Simplify and shorten museum art descriptions, provide context
              </li>
              <li className="mb-2">
                Visual design: Consistent and easy navigation and design
              </li>
              <li className="mb-2">
                Multimedia and alternative modalities: no scrolling, minimize distractions, minimal colors and high contrast, clear functionality, clearly labeled icons,  text-to-speech playback
              </li>
              <li className="mb-2">
                Independence: Quickly get definitions for words, customize reading level, frequent use of headings and prompts for guidance
              </li>
              <li className="mb-2">
                Scaffolding: Tutorial, break tasks down into manageable steps
              </li>
              <li className="mb-2">
                Interactions: Links change color when clicked, quickly get definitions for words on hover/tap
              </li>
            </ol>
            <img className="w-full max-w-2xl mx-auto" src="/images/affinity-1.png" alt="Affinity Diagram for Content Transformation, Visual Design, and Multimedia and alternative modalities." />
            <img className="w-full max-w-2xl mx-auto" src="/images/affinity-2.png" alt="Affinity Diagram for independence, scaffolding, and interactions." />
            <h1 className={h1}>Sketching and Storyboarding</h1>
            <p className={paragraph}>
            Based on our affinity diagram, each member of our team drafted an initial sketch of core features in our application.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <figure>
              <img className="w-full max-w-full mx-auto" src="/images/grace-sketch.jpg" alt="Grace's initial sketch." />
              <figcaption className="text-center text-sm text-neutral-500 mt-2">Grace's initial sketch</figcaption>
              </figure>
              <figure>
              <img className="w-full max-w-full mx-auto" src="/images/izzy-sketch.jpg" alt="Izzy's initial sketch." />
              <figcaption className="text-center text-sm text-neutral-500 mt-2">Izzy's initial sketch</figcaption>
              </figure>
              <figure>
              <img className="w-full max-w-full mx-auto" src="/images/mustafa-sketch.jpg" alt="Mustafa's initial sketch." />
              <figcaption className="text-center text-sm text-neutral-500 mt-2">Mustafa's initial sketch</figcaption>
              </figure>
              <figure>
              <img className="w-full max-w-full mx-auto" src="/images/nick-sketch.jpg" alt="Nick's initial sketch." />
              <figcaption className="text-center text-sm text-neutral-500 mt-2">Nick's initial sketch</figcaption>
              </figure>
            </div>
            <p className={paragraph}>
              Based on our sketches, we created a final storyboard for our prototype:
            </p>
            <div className="max-w-2xl">
              <figure>
                <img className="w-full max-w-full mx-auto" src="/images/final-storyboard.jpg" alt="Storyboard for MochaSimplifier." />
                <figcaption className="text-center text-sm text-neutral-500 mt-2">Storyboard for MochaSimplifier</figcaption>
              </figure>
            </div>
            <h1 className={h1}>Prototyping</h1>
            <p className={paragraph}>
              We created a prototype of our application located on the homepage of this website. Users can input an image, customize the reading level, and view a simplified summary of the text in the uploaded  image.
            </p>
            {/* <h1 className={h1}>Team</h1> */}
        </div>
      </div>
    </div> 
  );
}
