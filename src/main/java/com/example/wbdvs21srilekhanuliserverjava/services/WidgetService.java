package com.example.wbdvs21srilekhanuliserverjava.services;

import com.example.wbdvs21srilekhanuliserverjava.models.Widget;
import com.example.wbdvs21srilekhanuliserverjava.repositories.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {
  @Autowired
  WidgetRepository repository;

  public Widget createWidget(String tid, Widget widget) {
    widget.setTopicId(tid);
    return repository.save(widget);
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    return repository.findWidgetsForTopic(tid);
  }

  public int updateWidget(Long wid, Widget widget) {
    Widget originalWidget = findWidgetById(wid);

    originalWidget.setText(widget.getText());
    originalWidget.setSrc(widget.getSrc());

    repository.save(originalWidget);
    return 1;
  }

  public int deleteWidget(Long wid) {
    repository.deleteById(wid);
    return 1;
  }

  public List<Widget> findAllWidgets() {
    return repository.findAllWidgets();
  }

  public Widget findWidgetById(Long wid) {
    return repository.findWidgetById(wid);
  }


}
