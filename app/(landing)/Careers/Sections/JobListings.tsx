import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Job listing interface
interface JobListing {
  id: number;
  organization: string;
  logo: string;
  type: string;
  openingDate: string;
  closingDate: string;
  portalLink: string;
}

// Sample job listings data
const jobListings: JobListing[] = [
  {
    id: 1,
    organization: 'Nigerian Communication Commission',
    logo: '/logos/ncc.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.ncc.job.portal.ng',
  },
  {
    id: 2,
    organization: 'Federal Inland Revenue Service',
    logo: '/logos/firs.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.firs.job.portal.ng',
  },
  {
    id: 3,
    organization: 'Nigerian Rail Way Commission',
    logo: '/logos/nrwc.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.nrc.job.portal.ng',
  },
  {
    id: 4,
    organization: 'Nigerian Communication Commission',
    logo: '/logos/npc.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.ncc.job.portal.ng',
  },
  {
    id: 5,
    organization: 'Central Bank of Nigeria',
    logo: '/logos/cbn.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.cbn.job.portal.ng',
  },
  {
    id: 6,
    organization: 'National Agency For Foods & Drug',
    logo: '/logos/nafdac.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.nafdac.job.portal.ng',
  },
  {
    id: 7,
    organization: 'Energy Commission Of Nigeria',
    logo: '/logos/ecn.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.ecn.job.portal.ng',
  },
  {
    id: 8,
    organization: 'Independent National Electoral Commission',
    logo: '/logos/inec.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.inec.job.portal.ng',
  },
  {
    id: 9,
    organization: 'Economic & Financial Crime Commission',
    logo: '/logos/efcc.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.efcc.job.portal.ng',
  },
  {
    id: 10,
    organization: 'Nigerian National Petroleum Corporation',
    logo: '/logos/nnpc.png',
    type: 'Qualified Candidate',
    openingDate: '21 March 2025',
    closingDate: '21 May 2025',
    portalLink: 'www.nnpc.job.portal.ng',
  },
];

// Job card component
const JobCard: React.FC<{ job: JobListing }> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image
          src={job.logo}
          alt={`${job.organization} logo`}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-medium mb-2">{job.organization}</h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Type:</span> {job.type}</p>
          <p><span className="font-medium">Opening Date:</span> {job.openingDate}</p>
          <p><span className="font-medium">Closing Date:</span> {job.closingDate}</p>
          <p>
            <span className="font-medium">Portal link:</span>{' '}
            <Link href={`https://${job.portalLink}`} className="text-blue-600 hover:underline">
              {job.portalLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const JobListings: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Latest Job Listing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobListings.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/all-jobs"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
          >
            View All Job Openings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobListings;