import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../stores/workstation";

/**Workstation Wrapper
 * The Workstation section controls the rendering of gallery or annotation page.
 */
export const Workstation = () => { 
  const page = useSelector(state => state.workstation.page);
  const dispatch = useDispatch();

  const setPageNum = (pageNum) => { 
    dispatch(setPage(pageNum));
  }

  const getPageContent = (pageNum) => { 
    switch (pageNum) { 
      case 1:
        return <Annotation setPage={setPageNum} />;
      default:
        return <Gallery setPage={setPageNum} />;
    }
  }

  return (
    <Fragment>
      { getPageContent(page) }
    </Fragment>
  )
}