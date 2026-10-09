import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import BookingPipeline from '../components/BookingPipeline';
import MonthlyTarget from '../components/MonthlyTarget';
import BookingsChart from '../components/BookingsChart';
import ServicesDonut from '../components/ServicesDonut';
import NeedsAction from '../components/NeedsAction';
import UpcomingWeddings from '../components/UpcomingWeddings';
import { PlusIcon } from '../components/Icons';
import { stats, user, dateLabel } from '../data/dummyData';

export default function Dashboard() {
  return (
    <Layout>
      <main className="content">
        <div className="page-head">
          <div>
            <p className="page-head__date">{dateLabel}</p>
            <h1 className="page-head__title">Good morning, {user.firstName}</h1>
            <p className="page-head__sub">Here’s the rhythm of your studio today.</p>
          </div>
          <button className="btn-add"><PlusIcon width="18" height="18" /> Add booking</button>
        </div>

        <div className="stats">
          {stats.map((s) => <StatCard key={s.id} {...s} />)}
        </div>

        <div className="row-2">
          <BookingPipeline />
          <MonthlyTarget />
        </div>

        <div className="row-2">
          <BookingsChart />
          <ServicesDonut />
        </div>

        <div className="row-2 row-2--equal">
          <NeedsAction />
          <UpcomingWeddings />
        </div>
      </main>
    </Layout>
  );
}
