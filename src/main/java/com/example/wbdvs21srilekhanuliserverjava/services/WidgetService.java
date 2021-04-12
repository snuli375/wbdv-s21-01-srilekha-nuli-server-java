package com.example.wbdvs21srilekhanuliserverjava.services;

import com.example.wbdvs21srilekhanuliserverjava.models.Widget;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
  private final List<Widget> widgets = new ArrayList<Widget>();

  public Widget createWidget(String tid, Widget widget) {
    Long id = (new Date()).getTime();
    widget.setId(id);
    widget.setTopicId(tid);
    widgets.add(widget);
    return widget;
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    List<Widget> filtered = new ArrayList<>();
    for (Widget w : widgets) {
      if (w.getTopicId().equals(tid)) {
        filtered.add(w);
      }
    }
    return filtered;
  }

  public int updateWidget(Long wid, Widget widget) {
    for (Widget w : widgets) {
      if (w.getId().equals(wid)) {
        w = widget;
      }
    }
    return -1;
  }

  public int deleteWidget(Long wid) {
    List<Widget> filtered = new ArrayList<>();
    for (Widget w : widgets) {
      if (w.getTopicId().equals(wid)) {
        filtered.remove(w);
      }
    }
    return -1;
  }

  public List<Widget> findAllWidgets() {
    return widgets;
  }

  public Widget findWidgetById(Long wid) {
    for (Widget w : widgets) {
      if (w.getId().equals(wid)) {
        return w;
      }
    }
    return null;
  }


}
