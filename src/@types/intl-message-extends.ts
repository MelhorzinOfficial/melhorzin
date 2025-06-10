import pt from '../../lang/pt.json';
import en from '../../lang/en.json';

type Messages = typeof pt & typeof en;

declare global {
    interface IntlMessages extends Messages { }
}