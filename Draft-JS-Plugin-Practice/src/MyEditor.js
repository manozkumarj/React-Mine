import React, { Component } from "react";
import { EditorState } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import { convertToRaw } from "draft-js";
import mentions from "./mentions";
import editorStyles from "./editorStyles.css";
import mentionsStyles from "./mentionsStyles.css";
import pluginStyles from "../node_modules/draft-js-mention-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import createEmojiPlugin from "draft-js-emoji-plugin";

const text = `Cool, we can have all sorts of Emojis here. 🙌
🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;

export default class SimpleMentionEditor extends Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      mentions,
      entityMutability: "IMMUTABLE",
      mentionPrefix: "@",
      supportWhitespace: true,
    });
  }

  state = {
    // editorState: EditorState.createEmpty(),
    editorState: createEditorStateWithText(text),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = (vall) => {
    // get the mention object selected
    console.log(vall);
  };

  focus = () => {
    this.editor.focus();
  };

  renderContentAsRawJs() {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    return JSON.stringify(raw, null, 2);
  }

  Entry = (props) => {
    const {
      mention,
      theme,
      searchValue, // eslint-disable-line no-unused-vars
      isFocused, // eslint-disable-line no-unused-vars
      ...parentProps
    } = props;

    return (
      <div {...parentProps}>
        <div className={theme.mentionSuggestionsEntryContainer}>
          <div className={theme.mentionSuggestionsEntryContainerLeft}>
            <img
              src={mention.avatar}
              className={theme.mentionSuggestionsEntryAvatar}
              role="presentation"
            />

            <div className={theme.mentionSuggestionsEntryContainerRight}>
              <div className={theme.mentionSuggestionsEntryText}>
                {mention.name}
              </div>

              <div className={theme.mentionSuggestionsEntryTitle}>
                {mention.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    // const plugins = [this.mentionPlugin];

    const emojiPlugin = createEmojiPlugin();
    const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
    const plugins = [emojiPlugin, this.mentionPlugin];

    return (
      <div onClick={this.focus}>
        <div
          className={editorStyles.editor}
          style={{ border: "1px solid #000" }}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />

          <EmojiSuggestions />

          <div className={editorStyles.options}>
            <EmojiSelect />
          </div>

          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
            entryComponent={this.Entry}
          />
        </div>
        <br />
        <h3>editor content as json</h3>
        <pre id="raw-display">{this.renderContentAsRawJs()}</pre>
      </div>
    );
  }
}
