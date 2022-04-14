import { useState } from 'react';
import { SortFilters } from '../../interface';
import data1 from '../../mocks/axos.json';
import data2 from '../../mocks/cocc.json';
import './style.scss';

const Transactions = (): JSX.Element => {

  const [sortFilters, setSortFilters] = useState<SortFilters | null>({});

  const formatKeyValuePair = (a: string, b: string | null | undefined) => {
    // values that are strings
    if (b && isNaN(parseInt(b))) {
      return {[a]: b};
    }
    // values that are numbers
    if (b && typeof parseInt(b) === 'number') {
      return {[a]: parseInt(b)};
    }
    return {[a]: null};
  }

  const handleSortSelection = (e: React.MouseEvent<HTMLUListElement, MouseEvent>, inCategory: string) => {
    const sortByValue = e.target && (e.target as HTMLElement).tagName === "SPAN" ? (e.target as HTMLElement).dataset.sort : null;
    const sortFilter = formatKeyValuePair(inCategory, sortByValue);
    setSortFilters({...sortFilters, ...sortFilter});
  };

  const resetFilters = (): void => {
    setSortFilters(null);
  };

  const combinedData = [...data1, ...data2];

  const transactions = combinedData.filter(x => {
    if (!sortFilters) return x;
    if (sortFilters.month && sortFilters.year && sortFilters.institution) {
      return x.postedDateYear === sortFilters.year && x.postedDateMonth === sortFilters.month && x.institutionName === sortFilters.institution;
    } else if (sortFilters.month && sortFilters.year) {
      return x.postedDateYear === sortFilters.year && x.postedDateMonth === sortFilters.month
    } else if (sortFilters.month) {
      return x.postedDateMonth === sortFilters.month
    } else if (sortFilters.year)
      return x.postedDateYear === sortFilters.year
  })
  .map((transaction, index) => {
    const {amount, institutionName, postedDateDay, postedDateMonth, postedDateYear, description, type} = transaction;

    return (
      <li key={index}>
        <span className='transactions__colDate'>{postedDateYear} - {postedDateMonth} - {postedDateDay}</span>
        <span className='transactions__colDate'>{institutionName}</span>
        <span className='transactions__colDesc'>{description}</span>
        <span className='transactions__colType'>{type}</span>
        <span className='transactions__colAmount'>{amount}</span>
      </li>
    );
  });

  const filterButtons = {
    institutions: [
      {dataSort: "axos", value: "axos"},
      {dataSort: "cocc", value: "ccoc"}
    ],
    months: [
      {dataSort: 1, value: "January"},
      {dataSort: 2, value: "February"},
      {dataSort: 3, value: "March"},
      {dataSort: 4, value: "April"},
      {dataSort: 5, value: "May"},
      {dataSort: 6, value: "June"},
      {dataSort: 7, value: "July"},
      {dataSort: 8, value: "August"},
      {dataSort: 9, value: "September"},
      {dataSort: 10, value: "October"},
      {dataSort: 11, value: "November"},
      {dataSort: 12, value: "December"}
    ],
    years: [
      {dataSort: 2019, value: "2019"},
      {dataSort: 2020, value: "2020"},
      {dataSort: 2021, value: "2021"},
      {dataSort: 2022, value: "2022"}
    ]
  };

  const institutions = filterButtons.institutions.map((filterButton, index) => {
    return (
      <li key={index}>
        <span
          className={`${sortFilters && sortFilters.institution === filterButton.dataSort ? 'active' : ''}`}
          data-sort={filterButton.dataSort}
        >
          {filterButton.value}
        </span>
      </li>
      );
  });

  const months = filterButtons.months.map((filterButton, index) => {
    return (
      <li key={index}>
        <span
          className={`${sortFilters && sortFilters.month === filterButton.dataSort ? 'active' : ''}`}
          data-sort={filterButton.dataSort}
        >
          {filterButton.value}
        </span>
      </li>
      );
  });

  const years = filterButtons.years.map((filterButton, index) => {
    return (
      <li key={index}>
        <span
          className={`${sortFilters && sortFilters.year === filterButton.dataSort ? 'active' : ''}`}
          data-sort={filterButton.dataSort}
        >
          {filterButton.value}
        </span>
      </li>
      );
  });  

  return (
    <>
      <div className='data-filter'>
        <div className="data-filter__filters">
        <ul className='data-filter__institution' onClick={e => handleSortSelection(e, 'institution')}>
            {institutions}
          </ul>
          <ul className='data-filter__year' onClick={e => handleSortSelection(e, 'year')}>
            {years}
          </ul>
          <ul className='data-filter__month' onClick={e => handleSortSelection(e, 'month')}>
            {months}
          </ul>
        </div>
        <button className="btn btn--generic" onClick={resetFilters}>Reset Filters</button>
      </div>
      <ul className='transactions'>{transactions}</ul>
    </>
  )
};

export default Transactions;