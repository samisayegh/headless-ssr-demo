import * as React from 'react';
import List from '@material-ui/core/List';
import {ListItem, Box, Typography, ListItemProps} from '@material-ui/core';
import {
  buildResultList,
  Result,
  buildResultTemplatesManager,
  ResultTemplatesManager,
  ResultList as HeadlessResultList,
} from '@coveo/headless';
import {EngineContext} from '../context/engine';

type Template = (result: Result) => React.ReactNode;

interface FieldValueInterface {
  value: string;
  caption: string;
}

interface ResultListProps {
  controller: HeadlessResultList;
}
function ListItemLink(props: ListItemProps<'a'>) {
  return (
    <ListItem {...props} button component="a">
      <Typography variant="body1" color="primary">
        {props.title}
      </Typography>
    </ListItem>
  );
}

function FieldValue(props: FieldValueInterface) {
  return (
    <Box>
      <Typography
        color="textSecondary"
        style={{fontWeight: 'bold'}}
        variant="caption"
      >
        {props.caption}:&nbsp;
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {props.value}
      </Typography>
    </Box>
  );
}

const ResultListRenderer: React.FunctionComponent<ResultListProps> = (props) => {
  const {controller} = props;
  const engine = React.useContext(EngineContext)!;
  const [state, setState] = React.useState(controller.state);

  const headlessResultTemplateManager: ResultTemplatesManager<Template> =
    buildResultTemplatesManager(engine);

  headlessResultTemplateManager.registerTemplates({
    conditions: [],
    content: (result: Result) => (
      <ListItem disableGutters key={result.uniqueId}>
        <Box my={2}>
          <img src={result.raw.picture as string} width={160} style={{borderRadius: 8}}></img>
        </Box>
        <Box width={64}></Box>
        <Box my={2}>
          <Box pb={1}>
            <ListItemLink
              disableGutters
              title={result.title}
              href={result.clickUri}
            />
          </Box>

          {result.excerpt && (
            <Box pb={1}>
              <Typography color="textPrimary" variant="body2">
                {result.excerpt}
              </Typography>
            </Box>
          )}

          {result.raw.source && (
            <FieldValue caption="Source" value={result.raw.source} />
          )}
          {result.raw.objecttype && (
            <FieldValue caption="Object Type" value={result.raw.objecttype} />
          )}
        </Box>
      </ListItem>
    ),
  });

  React.useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  return (
    <List>
      {state.results.map((result: Result) => {
        const template = headlessResultTemplateManager.selectTemplate(result);
        return template ? template(result) : null;
      })}
    </List>
  );
};

export const ResultList = () => {
  const engine = React.useContext(EngineContext)!;
  const controller = buildResultList(engine, {options: {fieldsToInclude: ['picture']}});
  return <ResultListRenderer controller={controller} />;
};