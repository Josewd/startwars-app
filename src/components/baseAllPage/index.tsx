import React from 'react';
import Header from '../header';
import { Card, CardContent, Box, Typography } from '@mui/material';
import AutoFocusInput from '../autoFocusInput';
import Navigation from '../nav';
import InfinityScroll from '../infinityScroll';
import { Public as PublicIcon } from '@mui/icons-material';
import { SortDirection } from "../../types";
import ItemCard from '../card';
import Loading from "../loading";
import PeopleCard from '../card/peopleCard';

type BaseAllPageProps = {
  title: string;
  description: string;
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (field: string) => void;
  sortField: string;
  sortDirection: SortDirection;
  data: any[];
  nextUrl: string;
  fetchNextPage: () => void;
  loading: boolean;
  path: string;
  sortLinks: { name: string; onClick: () => void }[];
}

export default function BaseAllPage({ title,
  description,
  searchValue,
  handleSearch,
  handleSort,
  sortField,
  sortDirection,
  data,
  nextUrl,
  fetchNextPage,
  loading,
  path,
  sortLinks,
}: BaseAllPageProps) {
  return (
    <div className="space-y-6 universe">
     <Header
        title={title}
        description={description}
      />

      {/* Search and Controls */}
      <Card sx={{ 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '100%',
        margin: '20px auto'
      }}>
     
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center" justifyContent="space-between" mb={2}>
           <AutoFocusInput
            searchTerm={searchValue as string}
            handleSearch={handleSearch}
            placeholder={`Search ${title}...`}
           />
          <Navigation
            handleSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            links={sortLinks}
          />
          </Box>
          
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Showing {data.length} {title}
          </Typography>
        </CardContent>
      </Card>

      {/* Planets Grid */}
      {
        loading ? (
          <Loading message={`Loading ${title} from a galaxy far, far away...`} />
        ) : (
          <InfinityScroll
            hasMore={!!nextUrl}
            onLoadMore={fetchNextPage}
            loading={loading}
          >
            { data && data.map((item: any) => {
              if (path === '/person') {
                return <PeopleCard
                  key={item.name} 
                  name={item.name} 
                  homeworld={item?.homeworld || ''}
                  url={item.url || ''} 
                  path={path} 
                />;
              }
              return <ItemCard
                key={item.name} 
                name={item.name} 
                info={item?.homeworld || item?.model ||  ''} 
                url={item.url || ''} 
                path={path} 
              />;
            })}
          </InfinityScroll>   
        )
      }

      {/* Empty State */}
      {data.length === 0 && searchValue && (
        <Box textAlign="center" py={8}>
          <PublicIcon sx={{ fontSize: 84, color: '#6B7280', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#D1D5DB', mb: 1 }}>
            No {title} found
          </Typography>
          <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
            Try adjusting your search term to find {title}.
          </Typography>
        </Box>
      )}
    </div>
  );
}
