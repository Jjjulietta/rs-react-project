import { Component } from 'react';
import Search from '../Search/Search';
import CardList from '../CardList/CardList';
import HttpService from '../../services/http.service';
import { SEARCH_VALUE, URLS } from '../../utils/constants';
import { Seasons, Statuses } from '../../types/apiTypes';
import styles from './Main.module.css';
import Button from '../Button/Button';
import { AxiosError } from 'axios';

interface MainState {
  value: string;
  items: Seasons[] | [];
  error: string | undefined;
  errorStatus: string | undefined;
  isLoading: boolean;
}

interface Props {
  props: null;
}

export default class Main extends Component<Props, MainState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.getLocalStorageData() || '',
      items: [],
      error: undefined,
      errorStatus: undefined,
      isLoading: false,
    };
  }

  HttpService = new HttpService();
  updateValue = (val: string) => {
    this.setState({ value: val });
  };

  getData = () => {
    this.setState({ isLoading: true });
    this.HttpService.getPagination(URLS.PAGINATION)
      .then((data) => {
        this.setState({ items: data.seasons });
      })
      .catch((e: AxiosError) => {
        if (
          e.status &&
          (e.status >= Statuses.ErrorClient || e.status >= Statuses.ErrorServer)
        ) {
          this.setState({ errorStatus: e.message });
        } else {
          this.setState({ error: e.message });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  getSearchValue = (value: string) => {
    this.setState({ isLoading: true });
    this.HttpService.SearchData(
      URLS.SEARCH,
      value,
      { pageNumber: 0, pageSize: 10 },
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    )
      .then((data) => {
        this.setState({ items: data.data?.seasons });
      })
      .catch((e: AxiosError) => {
        if (
          e.status &&
          (e.status >= Statuses.ErrorClient || e.status >= Statuses.ErrorServer)
        ) {
          this.setState({ errorStatus: e.message });
        } else {
          this.setState({ error: e.message });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  getLocalStorageData = () => localStorage.getItem(SEARCH_VALUE);

  handleClick = () => {
    this.setState({ error: 'Error!' });
  };

  componentDidMount(): void {
    if (this.state.value) {
      this.getSearchValue(this.state.value);
    } else {
      this.getData();
    }
  }

  componentDidUpdate(
    _prevProps: Readonly<object>,
    prevState: Readonly<MainState>
  ): void {
    console.log(prevState.value);
    console.log(this.state.value);
    if (prevState.value !== this.state.value) {
      console.log(this.state.value);
      this.getSearchValue(this.state.value || '');
    }
  }
  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    return (
      <div>
        <Search value={this.state.value || ''} onSearch={this.updateValue} />
        <CardList
          items={this.state.items}
          error={this.state.errorStatus}
          isLoading={this.state.isLoading}
        />
        <Button
          type="button"
          className={styles.btn_error}
          onClick={this.handleClick}
          name="error button"
        />
      </div>
    );
  }
}
