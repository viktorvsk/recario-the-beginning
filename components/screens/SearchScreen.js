import React from "react";
import { Container, Content, Spinner } from "native-base";
import FiltersBar from "../FiltersBar";
import MakerModelsTabs from "../MakerModelsTabs";

export default class SearchScreen extends React.PureComponent {

    render () {
        const {nav, filters, onSubmit, onChange, cars, isLoading, settings} = this.props;

        return(
            <Container padder>
                <Content>
                    <FiltersBar filters={filters}
                        onSubmit={onSubmit}
                        onChange={onChange}
                        settings={settings}
                        nav={nav}
                    />
                    {isLoading ? <Spinner/> : <MakerModelsTabs cars={cars} settings={settings} nav={nav}/>}
                </Content>
            </Container>

        );
    }
}