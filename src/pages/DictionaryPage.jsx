import React, { Component } from 'react';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import { appBoundClassNames as classNames } from '../common/boundClassNames';
import { CourseListCode } from '@/shapes/enum';

import CourseListSection from '../components/sections/dictionary/courselist/CourseListSection';
import CourseDetailSection from '../components/sections/dictionary/coursedetail/CourseDetailSection';
import CourseListTabs from '../components/sections/dictionary/courselist/CourseListTabs';

import { reset as resetCourseFocus, setCourseFocus } from '../redux/actions/dictionary/courseFocus';
import {
  clearSearchListCourses,
  reset as resetList,
  setListCourses,
  setSelectedListCode,
} from '../redux/actions/dictionary/list';
import { closeSearch, reset as resetSearch } from '../redux/actions/dictionary/search';
import { performSearchCourses } from '../common/commonOperations';
import { parseQueryString } from '@/common/utils/parseQueryString';

class DictionaryPage extends Component {
  componentDidMount() {
    const { t } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { startCourseId, startTab, startSearchKeyword } =
      parseQueryString(this.props.location.search) || {};
    const {
      setCourseFocusDispatch,
      setSelectedListCodeDispatch,
      setListCoursesDispatch,
      closeSearchDispatch,
      clearSearchListCoursesDispatch,
    } = this.props;

    if (startCourseId) {
      axios
        .get(`/api/courses/${startCourseId}`, {
          metadata: {
            gaCategory: 'Course',
            gaVariable: 'GET / Instance',
          },
        })
        .then((response) => {
          setCourseFocusDispatch(response.data);
        })
        .catch((error) => {});
    }

    if (startTab) {
      setSelectedListCodeDispatch(startTab);
    }

    if (startSearchKeyword && startSearchKeyword.toString().trim()) {
      const LIMIT = 150;

      const option = {
        keyword: startSearchKeyword.toString().trim(),
      };
      const beforeRequest = () => {
        closeSearchDispatch();
        clearSearchListCoursesDispatch();
      };
      const afterResponse = (courses) => {
        if (courses.length === LIMIT) {
          // eslint-disable-next-line no-alert
          alert(t('ui.message.tooManySearchResults', { count: LIMIT }));
        }
        setListCoursesDispatch(CourseListCode.SEARCH, courses);
      };
      performSearchCourses(option, LIMIT, beforeRequest, afterResponse);
    } else if (
      startSearchKeyword !== undefined &&
      startSearchKeyword.toString().trim().length === 0
    ) {
      // eslint-disable-next-line no-alert
      alert(t('ui.message.blankSearchKeyword'));
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

  componentWillUnmount() {
    const { resetCourseFocusDispatch, resetListDispatch, resetSearchDispatch } = this.props;

    resetCourseFocusDispatch();
    resetListDispatch();
    resetSearchDispatch();
  }

  render() {
    return (
      <>
        <section className={classNames('content', 'content--no-scroll')}>
          <div className={classNames('page-grid', 'page-grid--dictionary')}>
            <CourseListTabs />
            <CourseListSection />
            <CourseDetailSection />
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetCourseFocusDispatch: () => {
    dispatch(resetCourseFocus());
  },
  resetListDispatch: () => {
    dispatch(resetList());
  },
  resetSearchDispatch: () => {
    dispatch(resetSearch());
  },
  setCourseFocusDispatch: (course) => {
    dispatch(setCourseFocus(course));
  },
  setSelectedListCodeDispatch: (listCode) => {
    dispatch(setSelectedListCode(listCode));
  },
  setListCoursesDispatch: (code, courses) => {
    dispatch(setListCourses(code, courses));
  },
  closeSearchDispatch: () => {
    dispatch(closeSearch());
  },
  clearSearchListCoursesDispatch: () => {
    dispatch(clearSearchListCourses());
  },
});

DictionaryPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      startCourseId: PropTypes.number,
      startTab: PropTypes.string,
      startSearchKeyword: PropTypes.string,
    }),
  }).isRequired,

  resetCourseFocusDispatch: PropTypes.func.isRequired,
  resetListDispatch: PropTypes.func.isRequired,
  resetSearchDispatch: PropTypes.func.isRequired,
  setCourseFocusDispatch: PropTypes.func.isRequired,
  setSelectedListCodeDispatch: PropTypes.func.isRequired,
  setListCoursesDispatch: PropTypes.func.isRequired,
  closeSearchDispatch: PropTypes.func.isRequired,
  clearSearchListCoursesDispatch: PropTypes.func.isRequired,
};

const ClassComponent = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(DictionaryPage),
);

const DictionaryPageFC = () => {
  const location = useLocation();

  return <ClassComponent location={location} />;
};

export default DictionaryPageFC;
